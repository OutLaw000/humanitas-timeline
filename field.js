/**
 * Humanitas — Living Phylogeny Field
 * Moving stars, nebula dust, soft meteors + atoms, chromosomes, DNA helix.
 * No connecting-dot network.
 */
(() => {
  const canvas = document.getElementById('phylo-field');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => innerWidth < 768;

  let dpr = 1, t = 0, scrollP = 0;
  const pointer = { x: -9999, y: -9999, active: false, gx: 0, gy: 0 };
  const stars = [];
  const atoms = [];
  const nebulae = [];
  const meteors = [];
  const chromosomes = [];
  let helix = null;
  let raf = 0;

  const COLORS = {
    life: [96, 165, 250],
    energy: [255, 184, 77],
    mind: [167, 139, 250],
    star: [220, 235, 255],
    warm: [255, 220, 180],
    pairA: [96, 165, 250],
    pairT: [251, 146, 60],
    pairC: [129, 140, 248],
    pairG: [244, 114, 182],
  };

  function rgba(c, a) {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    stars.length = 0;
    atoms.length = 0;
    nebulae.length = 0;
    meteors.length = 0;
    chromosomes.length = 0;

    const starN = mobile() ? 90 : reduced ? 70 : 180;
    for (let i = 0; i < starN; i++) {
      const layer = Math.random(); // 0 near, 1 far
      stars.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        // Far stars drift slower; near stars brighter
        z: 0.25 + layer * 0.85,
        r: layer > 0.85 ? 1.6 + Math.random() * 1.4 : 0.4 + Math.random() * 1.1,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.002 + Math.random() * 0.006,
        vx: (Math.random() - 0.5) * (0.08 + (1 - layer) * 0.22),
        vy: (0.04 + Math.random() * 0.12) * (0.5 + (1 - layer)),
        warm: Math.random() > 0.78,
        spark: Math.random() > 0.92,
      });
    }

    // Soft nebula clouds (blurred color blobs)
    const nCount = mobile() ? 3 : 5;
    for (let i = 0; i < nCount; i++) {
      const palette = [COLORS.life, COLORS.mind, COLORS.energy];
      nebulae.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: 80 + Math.random() * 140,
        c: palette[i % palette.length],
        a: 0.04 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Occasional meteors / shooting stars
    const mCount = mobile() ? 2 : 4;
    for (let i = 0; i < mCount; i++) {
      meteors.push(makeMeteor(true));
    }

    // Atoms (kept)
    const aCount = mobile() ? 5 : 9;
    for (let i = 0; i < aCount; i++) {
      atoms.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 2 + Math.random() * 1.5,
        mass: 1,
        phase: Math.random() * Math.PI * 2,
        electrons: 2 + (Math.random() * 3 | 0),
        spin: 0.015 + Math.random() * 0.02,
      });
    }

    // Chromosomes (kept)
    const cCount = mobile() ? 2 : 4;
    for (let i = 0; i < cCount; i++) {
      chromosomes.push({
        x: (i + 0.5) * (innerWidth / (cCount + 0.5)) + (Math.random() - 0.5) * 40,
        y: 80 + Math.random() * (innerHeight * 0.55),
        len: 70 + Math.random() * 90,
        rot: (Math.random() - 0.5) * 0.8,
        drift: 0.15 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        fold: 0.35 + Math.random() * 0.4,
      });
    }

    helix = {
      cx: innerWidth * 0.78,
      cy: Math.min(innerHeight * 0.42, 340),
      amp: mobile() ? 0 : 42,
      turns: 3.2,
      h: mobile() ? 0 : 260,
    };
  }

  function makeMeteor(initial) {
    const fromTop = Math.random() > 0.35;
    return {
      x: Math.random() * innerWidth * 1.2,
      y: initial ? Math.random() * innerHeight : (fromTop ? -20 : Math.random() * innerHeight * 0.4),
      vx: 2.2 + Math.random() * 3.5,
      vy: 1.4 + Math.random() * 2.2,
      len: 40 + Math.random() * 70,
      life: 0,
      maxLife: 90 + Math.random() * 100,
      delay: initial ? Math.random() * 200 : 40 + Math.random() * 180,
      active: false,
    };
  }

  function applyGravity(p, strength) {
    if (!pointer.active && !pointer.gx) return;
    const tx = pointer.active ? pointer.x : pointer.gx;
    const ty = pointer.active ? pointer.y : pointer.gy;
    const dx = tx - p.x;
    const dy = ty - p.y;
    const dist = Math.hypot(dx, dy) || 1;
    const reach = pointer.active ? 260 : 140;
    if (dist > reach) return;
    const force = strength * (1 - dist / reach);
    p.vx = (p.vx || 0) + (dx / dist) * force;
    p.vy = (p.vy || 0) + (dy / dist) * force;
    p.vx += (-dy / dist) * force * 0.4;
    p.vy += (dx / dist) * force * 0.4;
  }

  function stepStars() {
    for (const s of stars) {
      s.tw += s.twSpeed;
      // Slow drift + slight parallax by depth
      s.x += s.vx * s.z * (reduced ? 0 : 1);
      s.y += s.vy * s.z * (reduced ? 0 : 1);
      // Subtle gravity on nearer stars only
      if (s.z > 0.55 && pointer.active) {
        const dx = pointer.x - s.x;
        const dy = pointer.y - s.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 200) {
          s.x += (dx / d) * 0.15 * s.z;
          s.y += (dy / d) * 0.15 * s.z;
        }
      }
      if (s.x < -10) s.x = innerWidth + 10;
      if (s.x > innerWidth + 10) s.x = -10;
      if (s.y < -10) s.y = innerHeight + 10;
      if (s.y > innerHeight + 10) s.y = -10;
    }
  }

  function stepNebulae() {
    for (const n of nebulae) {
      n.phase += 0.003;
      n.x += n.vx + Math.sin(n.phase) * 0.05;
      n.y += n.vy + Math.cos(n.phase * 0.8) * 0.04;
      if (n.x < -n.r) n.x = innerWidth + n.r;
      if (n.x > innerWidth + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = innerHeight + n.r;
      if (n.y > innerHeight + n.r) n.y = -n.r;
    }
  }

  function stepMeteors() {
    for (let i = 0; i < meteors.length; i++) {
      const m = meteors[i];
      if (!m.active) {
        m.delay -= 1;
        if (m.delay <= 0) {
          m.active = true;
          m.life = 0;
          m.x = Math.random() * innerWidth * 0.7;
          m.y = -30 - Math.random() * 40;
          m.vx = 2.5 + Math.random() * 3;
          m.vy = 1.8 + Math.random() * 2.2;
        }
        continue;
      }
      m.life += 1;
      m.x += m.vx;
      m.y += m.vy;
      if (m.life > m.maxLife || m.x > innerWidth + 80 || m.y > innerHeight + 80) {
        meteors[i] = makeMeteor(false);
      }
    }
  }

  function stepAtoms() {
    for (const p of atoms) {
      applyGravity(p, pointer.active ? 0.03 : 0.01);
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.spin;
      if (p.x < -30) p.x = innerWidth + 30;
      if (p.x > innerWidth + 30) p.x = -30;
      if (p.y < -30) p.y = innerHeight + 30;
      if (p.y > innerHeight + 30) p.y = -30;
    }
  }

  function drawNebulae() {
    for (const n of nebulae) {
      const pulse = 0.85 + Math.sin(t * 0.001 + n.phase) * 0.15;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * pulse);
      g.addColorStop(0, rgba(n.c, n.a * 1.4));
      g.addColorStop(0.45, rgba(n.c, n.a * 0.5));
      g.addColorStop(1, rgba(n.c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStars() {
    for (const s of stars) {
      const twinkle = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw));
      const alpha = (0.25 + 0.55 * (1 - s.z * 0.35)) * twinkle;
      const c = s.warm ? COLORS.warm : COLORS.star;
      // Soft glow for brighter stars
      if (s.r > 1.2 || s.spark) {
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        g.addColorStop(0, rgba(c, alpha * 0.45));
        g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = rgba(c, alpha);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      // Cross sparkle on brightest
      if (s.spark && twinkle > 0.85) {
        ctx.strokeStyle = rgba(c, alpha * 0.5);
        ctx.lineWidth = 0.6;
        const arm = s.r * 3.5;
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y);
        ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm);
        ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();
      }
    }
  }

  function drawMeteors() {
    for (const m of meteors) {
      if (!m.active) continue;
      const fade = 1 - m.life / m.maxLife;
      const tx = m.x - m.vx * (m.len / 8);
      const ty = m.y - m.vy * (m.len / 8);
      const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
      grad.addColorStop(0, rgba(COLORS.warm, 0.85 * fade));
      grad.addColorStop(0.4, rgba(COLORS.life, 0.35 * fade));
      grad.addColorStop(1, rgba(COLORS.life, 0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.fillStyle = rgba(COLORS.star, 0.9 * fade);
      ctx.beginPath();
      ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawAtom(p) {
    const pulse = 0.65 + Math.sin(t * 0.003 + p.phase) * 0.35;
    const c = COLORS.energy;
    ctx.strokeStyle = rgba(c, 0.35 * pulse);
    ctx.lineWidth = 0.8;
    for (let e = 0; e < p.electrons; e++) {
      const ang = t * 0.002 * (1 + e * 0.3) + p.phase + e * 1.7;
      const rx = 8 + e * 5;
      const ry = 4 + e * 2.5;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, rx, ry, ang * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      const ex = p.x + Math.cos(ang) * rx;
      const ey = p.y + Math.sin(ang) * ry;
      ctx.fillStyle = rgba(c, 0.9);
      ctx.beginPath();
      ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = rgba(COLORS.life, 0.95);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawChromosome(ch) {
    const bob = Math.sin(t * 0.001 + ch.phase) * 10;
    const L = ch.len;
    const fold = ch.fold * L;
    ctx.save();
    ctx.translate(ch.x, ch.y + bob);
    ctx.rotate(ch.rot + Math.sin(t * 0.0005 + ch.phase) * 0.08);
    ctx.globalAlpha = 0.28 + scrollP * 0.25;

    ctx.strokeStyle = rgba(COLORS.mind, 0.85);
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-L * 0.15, -L * 0.5);
    ctx.quadraticCurveTo(-fold * 0.3, 0, -L * 0.12, L * 0.5);
    ctx.moveTo(L * 0.15, -L * 0.5);
    ctx.quadraticCurveTo(fold * 0.3, 0, L * 0.12, L * 0.5);
    ctx.stroke();

    ctx.fillStyle = rgba(COLORS.energy, 0.7);
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = rgba(COLORS.life, 0.5);
    ctx.lineWidth = 1;
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const yy = (i / 5) * L * 0.45;
      ctx.beginPath();
      ctx.moveTo(-6, yy);
      ctx.lineTo(6, yy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDNAHelix() {
    if (!helix || !helix.amp) return;
    const { cx, cy, amp, turns, h: hh } = helix;
    const steps = 80;
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';

    for (let strand = 0; strand < 2; strand++) {
      const offset = strand * Math.PI;
      const col = strand === 0 ? COLORS.pairA : COLORS.pairC;
      ctx.strokeStyle = rgba(col, 0.55);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const yy = cy - hh / 2 + u * hh;
        const ang = u * turns * Math.PI * 2 + t * 0.0015 + offset;
        const xx = cx + Math.sin(ang) * amp;
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      }
      ctx.stroke();
    }

    for (let i = 0; i <= steps; i += 3) {
      const u = i / steps;
      const yy = cy - hh / 2 + u * hh;
      const ang = u * turns * Math.PI * 2 + t * 0.0015;
      const x1 = cx + Math.sin(ang) * amp;
      const x2 = cx + Math.sin(ang + Math.PI) * amp;
      const pair = i % 6 === 0 ? COLORS.pairA : i % 6 === 3 ? COLORS.pairG : COLORS.pairT;
      ctx.strokeStyle = rgba(pair, 0.35 + 0.2 * Math.sin(t * 0.004 + i));
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, yy);
      ctx.lineTo(x2, yy);
      ctx.stroke();
    }
  }

  function drawGravityWell() {
    if (!pointer.active) return;
    const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160);
    g.addColorStop(0, 'rgba(96, 165, 250,0.1)');
    g.addColorStop(0.4, 'rgba(167,139,250,0.05)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,184,77,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 28 + Math.sin(t * 0.005) * 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  function frame(now) {
    t = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const wash = ctx.createLinearGradient(0, 0, 0, innerHeight);
    wash.addColorStop(0, `rgba(8, 12, 32, ${0.2 + scrollP * 0.08})`);
    wash.addColorStop(0.5, `rgba(4, 12, 28, ${0.1 + scrollP * 0.1})`);
    wash.addColorStop(1, `rgba(14, 6, 28, ${0.14 + scrollP * 0.12})`);
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    if (!reduced) {
      stepStars();
      stepNebulae();
      stepMeteors();
      stepAtoms();
      chromosomes.forEach((ch) => {
        ch.y += Math.sin(t * 0.0008 + ch.phase) * 0.15;
        ch.x += Math.cos(t * 0.0005 + ch.phase) * ch.drift * 0.3;
      });
    }

    drawNebulae();
    drawStars();
    drawMeteors();
    drawGravityWell();
    drawDNAHelix();
    chromosomes.forEach(drawChromosome);
    atoms.forEach(drawAtom);

    raf = requestAnimationFrame(frame);
  }

  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollP = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    pointer.gx = innerWidth * 0.5;
    pointer.gy = innerHeight * (0.35 + scrollP * 0.2);
  }

  function onPointer(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
  }

  function onLeave() {
    pointer.active = false;
  }

  window.HumanitasField = {
    pulse(x, y) {
      pointer.gx = x;
      pointer.gy = y;
      for (let i = 0; i < 4; i++) {
        const a = atoms[(Math.random() * atoms.length) | 0];
        if (!a) continue;
        a.vx += (x - a.x) * 0.002;
        a.vy += (y - a.y) * 0.002;
      }
      // Spawn a quick meteor toward the pulse
      const m = makeMeteor(false);
      m.active = true;
      m.delay = 0;
      m.x = Math.random() * innerWidth * 0.3;
      m.y = -20;
      m.life = 0;
      meteors.push(m);
      if (meteors.length > 8) meteors.shift();
    },
    setScroll(p) {
      scrollP = p;
    },
  };

  resize();
  onScroll();
  if (!reduced) raf = requestAnimationFrame(frame);
  else frame(0);

  addEventListener('resize', resize, { passive: true });
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('pointermove', onPointer, { passive: true });
  addEventListener('pointerdown', onPointer, { passive: true });
  addEventListener('pointerleave', onLeave, { passive: true });
  addEventListener('touchmove', onPointer, { passive: true });
})();
