let F,
  T,
  O,
  I,
  j,
  C,
  Y,
  k,
  B,
  D,
  Z,
  $,
  e1,
  t1,
  s,
  a1,
  l1,
  x,
  y,
  r1,
  s1,
  w = 0,
  z = 0,
  Q = 0,
  c1 = 0,
  o1 = 0,
  i1 = 0,
  n1 = 0,
  f1 = 0,
  m1 = 0,
  h1 = 0,
  u1 = 0,
  R = 0,
  X = 0,
  q = 0,
  g1 = 14,
  v1 = 180,
  d1 = .1,
  a = "data:image/svg+xml;base64,"
    + btoa(
      "<svg color-interpolation-filters=\"sRGB\" height=\"1024\" width=\"1024\" xmlns=\"http://www.w3.org/2000/svg\"><filter filterUnits=\"userSpaceOnUse\" height=\"1026\" id=\"a\" width=\"1026\" x=\"0\" y=\"0\"><feTurbulence baseFrequency=\".007\" height=\"1025\" numOctaves=\"6\" stitchTiles=\"stitch\" width=\"1025\" result=\"z\" type=\"fractalNoise\" x=\"1\" y=\"1\"/><feTile height=\"1024\" width=\"1024\" x=\"-1\" y=\"-1\"/><feTile/><feDiffuseLighting diffuseConstant=\"4\" lighting-color=\"red\" surfaceScale=\"5\"><feDistantLight azimuth=\"270\" elevation=\"5\"/></feDiffuseLighting><feTile height=\"1024\" width=\"1024\" x=\"1\" y=\"1\"/><feTile result=\"x\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1\" in=\"z\"/><feTile height=\"1024\" width=\"1024\" x=\"1\" y=\"1\"/><feTile result=\"z\"/><feTurbulence baseFrequency=\".01\" height=\"1024\" numOctaves=\"5\" stitchTiles=\"stitch\" width=\"1024\"/><feColorMatrix values=\"0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1\"/><feBlend in2=\"x\" mode=\"screen\"/><feBlend in2=\"z\" mode=\"screen\"/></filter><rect filter=\"url(#a)\" height=\"100%\" width=\"100%\"/></svg>",
    ),
  x1 = [],
  H = [],
  N = [],
  d = [{ x: -1, z: 1 }, { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: -1 }],
  L = e => e < 0 ? -e : e,
  y1 = (e, t) => e < t ? e : t,
  p1 = (e, t) => t < e ? e : t,
  w1 = (e, t) => L(e) > t ? e : 0,
  E = (e, t = 0, a = 1) => e < t ? t : a < e ? a : e,
  z1 = e => J1(_(e * Z1), J(e * Z1)) / Z1,
  S1 = (e, t, a) => e + (2 * (t = (t - e) % 360) % 360 - t) * E(a) || 0,
  A1 = (e, t, a) => (0 < a ? a < 1 ? e + (t - e) * a : t : e) || 0,
  M1 = (e, t) => (e = E(e), A1(e, 1 - e, t)),
  I1 = (e, t, a = 0) => (e * e + t * t + a * a) ** .5,
  U = (e = 0, t = 0, a = 0, l = 1) => {
    F = b.m11 * e + b.m21 * t + b.m31 * a + b.m41 * l,
      T = b.m12 * e + b.m22 * t + b.m32 * a + b.m42 * l,
      O = b.m13 * e + b.m23 * t + b.m33 * a + b.m43 * l,
      I = b.m14 * e + b.m24 * t + b.m34 * a + b.m44 * l;
  },
  p = (
    e,
    t = l,
    a = 0,
  ) => (a *= 16,
    t[a++] = e.m11,
    t[a++] = e.m12,
    t[a++] = e.m13,
    t[a++] = e.m14,
    t[a++] = e.m21,
    t[a++] = e.m22,
    t[a++] = e.m23,
    t[a++] = e.m24,
    t[a++] = e.m31,
    t[a++] = e.m32,
    t[a++] = e.m33,
    t[a++] = e.m34,
    t[a++] = e.m41,
    t[a++] = e.m42,
    t[a++] = e.m43,
    t[a] = e.m44,
    t),
  W = (
    e = S,
    t = b,
  ) => (t.m11 = e.m11,
    t.m12 = e.m12,
    t.m13 = e.m13,
    t.m14 = e.m14,
    t.m21 = e.m21,
    t.m22 = e.m22,
    t.m23 = e.m23,
    t.m24 = e.m24,
    t.m31 = e.m31,
    t.m32 = e.m32,
    t.m33 = e.m33,
    t.m34 = e.m34,
    t.m41 = e.m41,
    t.m42 = e.m42,
    t.m43 = e.m43,
    t.m44 = e.m44,
    t),
  c = (e, t, a) => S.translate(e, t, a),
  n = (e, a) => Array.from(Array(e), (e, t) => a(t)),
  g = (e, t, a) => (e.C = a, e.u = t, e),
  j1 = (e, t, a = e.u) => (W(t), g(e.map(({ x: e, y: t, z: a }) => (U(e, t, a), { x: F, y: T, z: O })), a, e.C)),
  o = (e, t, a) => e.map(e => j1(e, t, a)),
  C1 = (a, l = 0) =>
    n(a, e => {
      let t = J(2 * V * e / a);
      return { x: _(2 * V * e / a), y: 0, z: L(t) < .01 ? t : t < 0 ? t - l : t + l };
    }),
  Y1 = (l, r, s) =>
    l.map((e, t, { length: a }) => g([e, r[a - t - 1], r[a - (t + 1) % a - 1], l[(t + 1) % a]], l.u, s)),
  i = (
    e,
    t,
    a = 0,
    l,
  ) => (e = e ? C1(e, l) : d,
    l = j1(e, c(0, 1).scale3d(0 < a ? a : 1)),
    e = j1(e, c(0, -1).scale3d(a < 0 ? -a : 1)).reverse(),
    [...Y1(e, l, t), l, e]),
  k1 = (l, r = l, s = (e, t) => (t *= V / r, { x: J(e *= 2 * V / l) * _(t), y: J(t), z: _(e) * _(t) })) => {
    let c = [];
    for (let a = 0; l > a; a++) {
      for (let t = 0; r > t; t++) {
        let e = g([], 0, 1);
        c.push(e),
          e.push(s(a, t, e)),
          t && e.push(s((a + 1) % l, t, e)),
          r - 1 > t && e.push(s((a + 1) % l, t + 1 % r, e)),
          e.push(s(a, t + 1 % r, e));
      }
    }
    return c;
  },
  D1 = e => 1 - t(-Q * e),
  K = (e, t, a) => A1(e, t, D1(a)),
  F1 = (e, t, a, l) =>
    new DOMMatrix([a, 0, 0, 0, 0, l, 0, 0, 0, 0, (t + e) / (e - t), -1, 0, 0, 2 * t * e / (e - t), 0]),
  T1 = e => {
    h4.innerHTML += ".", setTimeout(e);
  },
  O1 = e => _(e * V * 2),
  B1 = (e, t) => {
    1 / 0 > d1 && (d1 = w + t, h4.innerHTML = e);
  },
  Q1 = () => {
    h3.innerHTML = "Souls: "
      + [0, "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"][
        i1 = x1.reduce((e, t) => e + t.i, 0)
      ] + " / XIII";
  },
  R1 = () => {
    localStorage.spdnt22 = JSON.stringify([H.map(e => e.i), x1.map(e => e.i), g1, t1, w]);
  },
  f = (e, t, a, l = 0) => 255 * l << 24 | 255 * a << 16 | 255 * t << 8 | 255 * e,
  m = () => {
    let l = [];
    s = (e, t = new DOMMatrix(), a) => l.push(...o(e, t, a)), N.push({ m: new DOMMatrix(), o: l });
  },
  h = e => {
    let t = () => {
        t.g = K(t.g, t.i, 4),
          t.h = K(t.h, t.i, 1),
          W(a).multiplySelf(e),
          k && (U(), I1(R - F, X - T, q - O) < 3)
            ? t.i
              ? .7 < t.g && (t.i = 0, g1 = l, B1("* click *", 1), R1())
              : t.g < .3 && (t.i = 1, g1 = l, B1("* click *", 1), R1())
            : t.i && .8 < t.g && 14 === l && (t.i = 0,
              i1 < 13
                ? B1("Not leaving now, there are souls to catch!", 3)
                : n1 || (B1("Well done. They will be punished.<br>Thanks for playing", 1 / 0), n1 = 1)),
          b.rotateSelf(50 * t.g - 25, 0).translateSelf(0, 1).m44 = t.g;
      },
      a = N.at(-1).m,
      l = H.length;
    t.m = a,
      t.F = e,
      H.push(t),
      s(i(5), e.translate(-.2).rotate(90, 90).scale(.4, .1, .5), f(.4, .5, .5)),
      s(i(5), e.translate(.2).rotate(90, 90).scale(.4, .1, .5), f(.4, .5, .5)),
      s(i(), e.translate(0, -.4).scale(.5, .1, .5), f(.5, .5, .4));
  },
  u = (o, ...i) => {
    let n,
      f,
      m,
      h,
      u = 0,
      g = 0,
      v = 1,
      d = -1,
      p = () => {
        if (!p.i) {
          let e, t, a, l, r, s = 1, c = 1 / 0;
          for (let a = 0; i.length > a; a++) {
            let e = i[a], t = I1(S - e[0], A - e[1]);
            s = y1(s, t / e[2]), (t -= e[2]) < 0 ? r = 1 : c > t && (c = t, b = e);
          }
          r
          || (e = S - b[0],
            t = A - b[1],
            a = I1(e, t),
            l = J1(-t, e),
            v && (h = E(h / (1 + G1())), g = (G1() - .5) * V / 2),
            l += g,
            d = -J(l),
            u = _(l),
            .1 < a && (a = y1(a, b[2]) / a, S = e * a + b[0], A = t * a + b[1])),
            v = r,
            h = K(h, 3 + 6 * (1 - s), 3 + s),
            M = K(M, S = K(S, S + d, h), h),
            I = K(I, A = K(A, A + u, h), h),
            n = S1(n, J1(M - f, I - m) / Z1 - 180, D1(3)),
            W(j).multiplySelf(o).translateSelf(f = M, 0, m = I).rotateSelf(0, n, 7 * _(1.7 * w)),
            U(),
            I1(R - F, X - T, q - O) < 1.6
            && (p.i = 1,
              B1(
                [
                  ,
                  "Mark Zuckemberg<br>made the world worse",
                  "Giorgia Meloni<br>fascist",
                  "Andrzej Mazur<br>for the js13k competition",
                  "Donald Trump<br>lies",
                  "Kim Jong-un<br>Dictator, liked pineapple on pizza",
                  "Maxime Euziere<br>forced me to finish this game",
                  "She traded NFTs apes",
                  ,
                  "Vladimir Putin<br>evil war",
                  "He was not a good person",
                  ,
                  "Salvatore Previti<br>made this evil game<br><br>Done. Go back to the boat",
                ][i1] || "Catched a \"crypto bro\".<br>\"Web3\" is all scam, lies and grift",
                6,
              ),
              Q1(),
              R1());
        }
        p.i
          && W(N[35].m).translateSelf(
            e % 4 * 1.2 - 1.7 + _(w + e) / 7,
            -2,
            1.7 * (e / 4 | 0) - 5.5 + L(e % 4 - 2) + J(w / 1.5 + e) / 6,
          );
      },
      b = i[0],
      [S, A] = b,
      [M, I] = b,
      j = N.at(-1).m,
      e = x1.length;
    x1.push(p);
  },
  X1 = ({ x: e, y: t, z: a }, l) => e * l.x + t * l.y + a * l.z,
  q1 = e => {
    let t, a = 0, l = 0, r = 0, s = e.at(-1);
    for (t of e) a += (s.y - t.y) * (s.z + t.z), l += (s.z - t.z) * (s.x + t.x), r += (s.x - t.x) * (s.y + t.y), s = t;
    return t = I1(a, l, r), a /= t, l /= t, r /= t, { x: a, y: l, z: r, w: a * s.x + l * s.y + r * s.z };
  },
  H1 = (l, r) => {
    let s, c, o, i = r.B;
    for (let e = 0; i.length > e; ++e) {
      if ((s = X1(l, i[e]) - l.w) < -8e-5 ? o = r : 8e-5 < s && (c = r), o && c) {
        c = [], o = [], i = r.B, e = r.v;
        let t = i.at(-1), a = X1(l, t) - l.w;
        for (let e of i) {
          s = X1(l, e) - l.w,
            a < 8e-5 && o.push(t),
            -8e-5 < a && c.push(t),
            (8e-5 < a && s < -8e-5 || a < -8e-5 && 8e-5 < s)
            && (a /= s - a,
              t = { x: t.x + (t.x - e.x) * a, y: t.y + (t.y - e.y) * a, z: t.z + (t.z - e.z) * a },
              c.push(t),
              o.push(t)),
            t = e,
            a = s;
        }
        return {
          l: 2 < c.length && { B: g(c, i.u, i.C), v: e, A: r },
          j: 2 < o.length && { B: g(o, i.u, i.C), v: e, A: r },
        };
      }
    }
    return { l: c, j: o };
  },
  N1 = (e, t, a = q1(t.B)) => {
    let l, r;
    return e
      ? ({ l, j: r } = H1(e, t), l || r || e.o.push(t), l && (e.l = N1(e.l, l, a)), r && (e.j = N1(e.j, r, a)))
      : e = { x: a.x, y: a.y, z: a.z, w: a.w, o: [t], l: 0, j: 0 },
      e;
  },
  L1 = (t, r, s) => {
    let c = [],
      o = (e, t) => {
        let { l: a, j: l } = H1(e, t);
        a || l || (0 < s * X1(e, r) ? a = t : l = t), a && (e.l ? o(e.l, a) : c.push(a)), l && e.j && o(e.j, l);
      };
    for (let e of r.o) o(t, e);
    return c;
  },
  E1 = (e, t) => e && (t(e), E1(e.l, t), E1(e.j, t)),
  U1 = e => (E1(e, t => {
    let e = t.j;
    t.j = t.l, t.l = e, t.x *= -1, t.y *= -1, t.z *= -1, t.w *= -1;
    for (let e of t.o) e.v = !e.v;
  }),
    e),
  W1 = e => e.length ? e.reduce((e, t) => N1(e, { B: t, v: 0, A: 0 }), 0) : e,
  K1 = (...e) =>
    e.reduce((l, t) => {
      let r = [];
      if (l = W1(l), t) {
        t = W1(t), E1(l, e => e.o = L1(t, e, 1)), E1(t, e => r.push([e, L1(l, e, -1)]));
        for (let [t, a] of r) for (let e of a) N1(l, e, t);
      }
      return l;
    }),
  v = (e, ...t) => {
    let a = e => {
        let t;
        return e.A && ((t = l.get(e.A)) ? (r.delete(t), e = a(e.A)) : l.set(e.A, e)), e;
      },
      l = new Map(),
      r = new Map();
    return e = U1(K1(U1(W1(e)), ...t)),
      E1(e, t => {
        for (let e of t.o) r.set(a(e), e.v);
      }),
      Array.from(r, ([{ B: e }, t]) => {
        let a = e.map(({ x: e, y: t, z: a }) => ({ x: e, y: t, z: a }));
        return g(t ? a.reverse() : a, e.u, e.C);
      });
  },
  P = (e, t = 0, a = 0) => {
    let l = N[++a1].m;
    return W(S, l), l.m41 = e, l.m42 = t, l.m43 = a, l;
  },
  P1 = (e, t) => {
    C
      ? 1100 < hC.width && e.d97(4, N[39].D - N[37].s, 5123, 2 * N[37].s)
      : (void 0 !== t && e.das(4, N[40].D - N[40].s, 5123, 2 * N[40].s, x1.length),
        e.das(4, N[41].D - N[41].s, 5123, 2 * N[41].s, H.length),
        e.d97(4, (t ? N[39].D : N[37].s) - 3, 5123, 6));
  },
  V1 = (a, e, t) => {
    let l = {}, r = (e, t = 35633) => (t = a.c6x(t), a.s3c(t, e), a.c6a(t), t), s = a.c1h();
    return a.abz(s, r(e, 35633)), a.abz(s, r(t, 35632)), a.l8l(s), e => e ? l[e] || (l[e] = a.gan(s, e)) : a.u7y(s);
  },
  b = new DOMMatrix(),
  S = new DOMMatrix(),
  l = new Float32Array(16),
  A = new Float32Array(760),
  _1 = new Uint8Array(65536),
  { PI: V, atan2: J1, sin: _, cos: J, exp: t, random: G1 } = Math,
  Z1 = V / 180,
  G = hD.getContext("webgl2", { powerPreference: "high-performance", preserveDrawingBuffer: !0, antialias: !1 }),
  M = hC.getContext("webgl2", { powerPreference: "high-performance" });
for (let e in M) {
  M[e[0] + [...e].reduce((e, t, a) => (e * a + t.charCodeAt(0)) % 434, 0).toString(36)] = M[e],
    G[e[0] + [...e].reduce((e, t, a) => (e * a + t.charCodeAt(0)) % 434, 0).toString(36)] = G[e];
}
T1(() => {
  let e = 0,
    g = () => {
      if (2 == ++e) {
        let l = t => {
            requestAnimationFrame(l);
            let e = (t - (j || t)) / 1e3;
            if (z += e, w += Q = C ? 0 : y1(.055, e), j = t, 0 < Q) {
              e = (e, t, a) => P(e + _(w + 2) / 5, t + _(.8 * w) / 5, a).rotateSelf(2 * _(w), _(.7 * w), _(.9 * w)),
                d1 && w > d1 && (d1 = 0, h4.innerHTML = ""),
                n1 && (B = 0),
                e1 = n1 ? K(e1, -9, .015) : K(e1, E(w / 3), 1),
                t1 = K(t1, H[14].h, .2 + .3 * L(2 * H[14].h - 1)),
                $(),
                a1 = 1,
                x = M1(H[13].g, H[8].g),
                s1 = A1(K(s1, 0, 1), z1(s1 + 60 * Q), H[2].g - H[3].h),
                y = A1(K(y, 0, 5), z1(y + 56 * Q), x),
                r1 = A1(K(r1, 0, 4), z1(r1 + 48 * Q), x),
                P(0, 270 * (H[1].g - 1) + (2 + 5 * J(1.5 * w)) * (1 - H[10].g)),
                t = y1(1 - H[11].h, H[10].h),
                P(t * _(.6 * w + 1.2) * 12, 0, 35),
                P(t * _(.6 * w - 1.2) * 8.2, 0, 55),
                P(t * _(.6 * w) * 12, 0, 45),
                P(9.8 * (1 - t)),
                t = E(1 - 5 * t) * M1(H[11].g, H[2].g),
                P(0, t * _(1.35 * w) * 4),
                P(0, 0, t * _(.9 * w) * 8),
                P(0, -6.5 * H[11].h),
                t = M1(H[4].h, H[3].h),
                P(0, t * _(w) * 5 + 3.5 * (1 - p1(H[3].g, H[4].g))),
                P(0, t * _(w + 3) * 6, t * _(.6 * w + 1) * 6),
                P(0, -7.3 * H[4].h),
                t = M1(H[6].g, H[7].g),
                P(0, -2, 10 - 8.5 * t * L(_(1.1 * w))),
                P(0, -2, 10 - 8.5 * t * L(_(2.1 * w))),
                P(0, -2, 10 - 8.5 * p1(t * L(_(1.5 * w)), (1 - H[6].g) * (1 - t)));
              var a = M1(H[5].h, H[13].h);
              for (t = 0; t < 4; t++) {
                P(
                  (2 < t ? 2 * (1 - a) + a : 0) - 100,
                  a * _(1.3 * w + 1.7 * t) * (3 + t / 3) + .7,
                  115 - 7 * (1 - H[5].h) * (1 - H[13].h) * (1 & t ? -1 : 1)
                    + p1(.05, a) * J(1.3 * w + 7 * t) * (4 - 2 * (1 - t / 3)),
                );
              }
              t = M1(H[8].h, H[9].h);
              for (let e = 0; e < 3; ++e) {
                P(0, t * _(1.5 * w + 1.5 * e) * 4 + (e ? 0 : 3 * (1 - H[8].h) * (1 - H[9].h)));
              }
              for (
                t = M1(M1((H[9].g + H[9].h) / 2, H[8].h), (H[12].g + H[12].h) / 2),
                  P(0, 16 * t, 95 + 8.5 * E(2 * t - 1)),
                  P(0, -4.7 * H[0].g, -15),
                  P(0, -4.7 * H[10].g, 15),
                  P(-99.7, -1.9 - 5.5 * H[3].g, 63.5),
                  P(-100, .6 - 5.8 * H[13].g, 96.5),
                  P(-75, 3 * (1 - H[2].h) * (1 - H[3].g), 55).rotateSelf(180 * (1 - H[2].h) + s1, 0),
                  P(2.5 * (1 - a) - 139.7, -3 * (1 - H[5].g) - a * _(.8 * w) - 1.8, 93.5).rotateSelf(
                    J(1.3 * w) * (3 + 3 * a),
                    0,
                  ),
                  P(-2 * _(w)).rotateSelf(25 * _(w)),
                  P(-81, .6, 106).rotateSelf(0, 40 + y),
                  P(-65.8, .8, 106).rotateSelf(0, r1),
                  P(-50.7, .8, 106).rotateSelf(0, 180 - r1),
                  P(-50.7, .8, 91).rotateSelf(0, 270 + r1),
                  e(-12, 4.2, 40 * e1 - 66),
                  e(-123, 1.4, 55 - 65 * t1),
                  e = 0;
                e < 13;
                ++e
              ) {
                x1[e](), p(b, A, 12 + e);
              }
              for (e = 0; e < 16; ++e) H[e](), p(b, A, 25 + e);
              for (let e, t = 0, a = 656; t < 26; ++t, ++a) {
                e = N[2 + t].m, A[a++] = e.m41, A[a++] = e.m42, A[a++] = e.m43;
              }
              for (l1(), e = 0; e < 12; ++e) {
                p(N[28 + e].m, A, e);
              }
              G.cbf(!0, !0, !0, !0),
                G.c4s(16640),
                G.u3a(r("j"), A),
                G.cbf(!0, !1, !0, !1),
                G.uae(r("b"), !1, p(W().rotateSelf(0, 180).invertSelf().translateSelf(-R, -X, .3 - q))),
                P1(G),
                G.c4s(256),
                G.cbf(!1, !0, !1, !0),
                G.uae(r("b"), !1, p(W().translateSelf(-R, -X, -q - .3))),
                P1(G),
                G.f1s(),
                k = 0;
            }
            e = f1,
              a = m1,
              t = h1,
              C
                ? (W(D).invertSelf(),
                  U(3.6, 3.5),
                  e = F,
                  a = T,
                  t = 5,
                  W(S, u).rotateSelf(-20, 0).invertSelf().translateSelf(-e, -a, -t).rotateSelf(0, 99),
                  W().rotateSelf(0, 40 * _(z) - 80, -8),
                  p(b, A, 9),
                  p(b, A, 10),
                  p(b, A, 11))
                : W(S, u).rotateSelf(-u1, -v1).invertSelf().translateSelf(-e, -a, -t),
              d(),
              M.u3a(d("j"), A),
              M.ubu(d("k"), e, a, t),
              M.uae(d("a"), !1, p(S)),
              M.ubh(d("g"), 3),
              M.ubh(d("h"), 3),
              M.b6o(36160, i),
              M.v5y(0, 0, 2048, 2048),
              c(54.7),
              P1(M, !B),
              o(126),
              P1(M, !B),
              M.b6o(36160, null),
              M.v5y(0, 0, M.drawingBufferWidth, M.drawingBufferHeight),
              M.cbf(!0, !0, !0, !0),
              M.c4s(16640),
              M.uae(d("b"), !1, p(u)),
              M.uae(d("a"), !1, p(D)),
              M.uae(d("i"), !1, g),
              M.ubh(d("g"), 0),
              M.ubh(d("h"), 1),
              P1(M, !B),
              s(),
              M.uae(s("b"), !1, p(W(u).invertSelf())),
              M.ubu(s("j"), M.drawingBufferWidth, M.drawingBufferHeight, z),
              M.d97(4, 3, 5123, 0);
          },
          h = new DOMMatrix(),
          u = new DOMMatrix(),
          g = new Float32Array(32),
          e = t,
          v = n(8, () => ({})),
          r = V1(
            G,
            `#version 300 es
layout(location=0)in vec4 f;layout(location=1)in vec3 e;layout(location=2)in vec4 d;out vec4 o,m,n,l;uniform mat4 b,a;uniform vec4 j[190];void main(){mat4 r=mat4(1);lowp int i=int(f.w);if(l=d,m=vec4(f.xyz,1),f.w>1.&&f.w<28.)m+=(r[3]=j[i+162]);else if(f.w!=1.){if(i=(i<1?gl_InstanceID-i:i-28)*4,r[0]=j[i],r[1]=j[i+1],r[2]=j[i+2],r[3]=j[i+3],f.w==-25.&&l.w==0.)l=mix(l,vec4(.7,1,.2,0),r[3][3]);r[3][3]=1.,m=r*m;}gl_Position=a*b*m,m.w=f.w,o=r*vec4(e,0),n=f;}`,
            `#version 300 es
precision highp float;in vec4 o,m;uniform mat4 b;out vec4 O;void main(){vec4 a=b*vec4(vec3(0,1.49,.3*b[0][0])+m.xyz,1);if(O=vec4(0),gl_FragCoord.y>36.){if(a.y>.6&&a.y<4.){float e=abs(gl_FragCoord.x/64.-1.),i=clamp(a.z+.7,0.,1.);O=vec4(vec2(b[0][0]*sign(a.x)*o.x<0.?i*(.7-abs(a.x))*e/.7:0.),vec2(b[0][0]*o.z>0.?i*(1.-e):0.));}}else if(o.y>.45&&a.y<1.){float e=a.y*clamp((a.z+.4)*50.,0.,1.)*clamp((-abs(a.x)+.2)*10.,0.,1.);O=vec4(vec2(e),vec2(e>0.?m.w/255.:0.));}}`,
          ),
          d = V1(
            M,
            `#version 300 es
layout(location=0)in vec4 f;layout(location=1)in vec3 e;layout(location=2)in vec4 d;out vec4 o,m,n,l;uniform mat4 b,a;uniform vec4 j[190];void main(){mat4 r=mat4(1);lowp int i=int(f.w);if(l=d,m=vec4(f.xyz,1),f.w>1.&&f.w<28.)m+=(r[3]=j[i+162]);else if(f.w!=1.){if(i=(i<1?gl_InstanceID-i:i-28)*4,r[0]=j[i],r[1]=j[i+1],r[2]=j[i+2],r[3]=j[i+3],f.w==-25.&&l.w==0.)l=mix(l,vec4(.7,1,.2,0),r[3][3]);r[3][3]=1.,m=r*m;}gl_Position=a*b*m,m.w=f.w,o=r*vec4(e,0),n=f;}`,
            `#version 300 es
precision highp float;in vec4 o,m,n,l;uniform highp sampler2D q;uniform highp sampler2DShadow g,h;uniform mat4 b,i[2];uniform vec3 k;out vec4 O;void main(){vec4 s=vec4(m.xyz,1);vec3 e=normalize(o.xyz),v=l.w*(texture(q,n.zy*.035)*e.x+texture(q,n.xz*.035)*e.y+texture(q,n.xy*.035)*e.z).xyz;e=normalize(e+v*.5);float a=dot(e,vec3(-.656059,.666369,-.35431468)),t=1.,u=abs((b*s).z);vec4 r=(u<55.?i[0]:i[1])*s;if(r=r/r.w*.5+.5,r.z<1.){t=0.;for(float e=-1.;e<=1.;++e)for(float a=-1.;a<=1.;++a){vec3 x=vec3(r.xy+vec2(e,a)/2048.,r.z-.00017439);t+=u<55.?texture(g,x):texture(h,x);}t/=9.;}vec3 x=l.xyz*(1.-v.x);float c=max(max(abs(e.x),abs(e.z))*.3-e.y,0.)*pow(max(0.,(8.-m.y)/48.),1.6);O=vec4(vec3(c,c*c*.5,0)+vec3(.09,.05,.11)*x+x*(max(0.,a)*.5+x*a*a*vec3(.5,.45,.3))*(t*.75+.25)+vec3(.6,.6,.5)*pow(max(0.,dot(normalize(m.xyz-k),reflect(vec3(-.656059,.666369,-.35431468),e))),35.)*t,1);}`,
          ),
          s = V1(
            M,
            `#version 300 es
in vec4 f;void main(){gl_Position=vec4(f.xy,1,1);}`,
            `#version 300 es
precision highp float;uniform mat4 b;uniform vec3 j;uniform highp sampler2D q;out vec4 O;void main(){vec2 t=gl_FragCoord.xy/j.xy*2.-1.;vec3 e=(normalize(b*vec4(t.x*-(j.x/j.y),-t.y,1.73205,0.))).xyz;float o=(-32.-b[3].y)/e.y,i=1.-clamp(abs(o/9999.),0.,1.);if(O=vec4(0,0,0,1),i>.01){if(o>0.){float i=cos(j.z/30.),o=sin(j.z/30.);e.xz*=mat2(i,o,-o,i);vec3 t=abs(e);O.xyz=vec3(dot(vec2(texture(q,e.xy).z,texture(q,e.yz*2.).z),t.zx)*t.y);}else e=b[3].xyz+e*o,O.x=(i*=.9-texture(q,e.xz/150.+vec2(sin(e.z/35.+j.z),cos(e.x/25.+j.z))/80.).y),O.y=i*i*i;}}`,
          ),
          [c, o] = n(2, e => {
            let t = M.c25();
            return M.a4v(33984 + e),
              M.b9j(3553, t),
              M.t60(3553, 0, 33190, 2048, 2048, 0, 6402, 5125, null),
              M.t2z(3553, 10241, 9729),
              M.t2z(3553, 10240, 9729),
              M.t2z(3553, 34893, 515),
              M.t2z(3553, 34892, 34894),
              M.t2z(3553, 10243, 33071),
              M.t2z(3553, 10242, 33071),
              l => {
                let a = 0, r = 0, s = 0, c = 1 / 0, o = 1 / 0, i = 1 / 0, n = -1 / 0, f = -1 / 0, m = -1 / 0;
                M.fas(36160, 36096, 3553, t, 0),
                  M.c4s(256),
                  W().scale3dSelf(l *= 1.1).multiplySelf(W(Z[e], h).multiplySelf(u).invertSelf());
                for (let t = 0; t < 8; ++t) {
                  let e = v[t];
                  U(4 & t ? 1 : -1, 2 & t ? 1 : -1, 1 & t ? 1 : -1),
                    a -= e.x = (0 | F) / l / I,
                    r -= e.y = (0 | T) / l / I,
                    s -= e.z = (0 | O) / l / I;
                }
                for (W().rotateSelf(298, 139).translateSelf(a / 8, r / 8, s / 8), l = 0; l < 8; ++l) {
                  let { x: e, y: t, z: a } = v[l];
                  U(e, t, a), c = y1(c, F), n = p1(n, F), o = y1(o, T), f = p1(f, T), i = y1(i, O), m = p1(m, O);
                }
                l = 10 + e,
                  i *= i < 0 ? l : 1 / l,
                  m *= 0 < m ? l : 1 / l,
                  M.uae(
                    d("b"),
                    !1,
                    p(
                      W(S, h).scaleSelf(2 / (n - c), 2 / (f - o), 2 / (i - m)).translateSelf(
                        (n + c) / -2,
                        (f + o) / -2,
                        (i + m) / 2,
                      ).multiplySelf(b),
                      g,
                      e,
                    ),
                    16 * e,
                    16,
                  );
              };
          }),
          i = M.c5w();
        r(),
          G.uae(r("a"), !1, p(F1(1e-4, 2, 1.2, .4))),
          G.c5t(0, 0, 0, 0),
          G.v5y(0, 0, 128, 128),
          G.e8z(2929),
          G.e8z(2884),
          d(),
          M.ubh(d("q"), 2),
          s(),
          M.ubh(s("q"), 2),
          M.b6o(36160, i),
          M.d45([0]),
          M.r9l(0),
          M.a4v(33986),
          M.b9j(3553, M.c25()),
          M.t60(3553, 0, 6408, 1024, 1024, 0, 6408, 5121, e),
          M.t2z(3553, 10241, 9987),
          M.t2z(3553, 10240, 9729),
          M.gbn(3553),
          M.c5t(0, 0, 0, 1),
          M.e8z(2929),
          M.e8z(2884),
          M.d4n(515),
          (() => {
            let e,
              i,
              n,
              f,
              m,
              h,
              u,
              g,
              v,
              d,
              p,
              b,
              S,
              t,
              a,
              l,
              r = !0,
              s = [],
              c = () => {
                b4.innerHTML = "Music: " + r, l && (C || !r ? l.disconnect() : l.connect(a.destination));
              },
              o = () => {
                let e = (hC.height = innerHeight) / (hC.width = innerWidth) * 1.732051;
                Z = [F1(.3, 55, e, 1.732051), F1(55, 181, e, 1.732051)],
                  D = F1(.3, 181, e, 1.732051),
                  f = g = void 0,
                  s.length =
                    k =
                    t =
                    b =
                    S =
                    c1 =
                    o1 =
                      0,
                  document.hidden && A(!0);
              },
              A = e => {
                if (C !== e) {
                  if (C = e, o(), document.body.className = e ? "l m" : "l", e) {
                    try {
                      document.exitFullscreen().catch(() => 0), document.exitPointerLock();
                    } catch {}
                  }
                  c();
                }
              },
              M = e => {
                try {
                  a || (a = new AudioContext(), (l = a.createBufferSource()).buffer = Y, l.loop = !0, l.start()),
                    document.body.requestFullscreen().catch(() => 0);
                } catch {}
                A(!1), B = e;
              },
              I = (e, t) => e.buttons[t]?.pressed || 0 < e.buttons[t]?.value ? 1 : 0;
            oncontextmenu = () => !1,
              b1.onclick = () => {
                M();
              },
              b2.onclick = () => {
                M(1);
              },
              b5.onclick = () => A(!0),
              b4.onclick = () => {
                r = !r, c();
              },
              b3.onclick = () => {
                confirm("Restart game?") && (localStorage.spdnt22 = "", location.reload());
              },
              onclick = e => {
                if (!C && (e.target === hC && (k = 1), B)) {
                  try {
                    hC.requestPointerLock();
                  } catch {}
                }
              },
              onkeyup = onkeydown = e => {
                let t;
                e.repeat
                  || (t = {
                    KeyE: 0,
                    Space: 0,
                    Enter: 0,
                    Escape: 1,
                    KeyA: 2,
                    ArrowLeft: 2,
                    KeyD: 3,
                    ArrowRight: 3,
                    KeyW: 4,
                    ArrowUp: 4,
                    KeyS: 5,
                    ArrowDown: 5,
                  }[e.code],
                    (s[t] = !!e.type[5] && !0) && (0 === t && (k = 1), 1 === t && A(!0)));
              },
              onmousemove = ({ movementX: e, movementY: t }) => {
                B && (e || t) && (v1 += .1 * e, u1 += .1 * t);
              },
              hC.ontouchstart = l => {
                if (!C) {
                  for (let { pageX: e, pageY: t, identifier: a } of l.changedTouches) {
                    B && e > hC.clientWidth / 2
                      ? void 0 === g && (v = 0, h = e, u = t, g = a, p = u1, d = v1)
                      : void 0 === f && (m = 0, i = e, n = t, f = a);
                  }
                  e = z;
                }
              },
              hC.ontouchmove = l => {
                let r, s, c, o;
                if (!C) {
                  for (let { pageX: e, pageY: t, identifier: a } of l.changedTouches) {
                    g === a && (u1 = p + (t - u) / 2.3, v1 = d + (e - h) / 2.3, v = 1),
                      f === a
                      && (a = (i - e) / 20,
                        r = L(a),
                        s = (n - t) / 20,
                        c = L(s),
                        (o = .5 < p1(r, c)) && (m = 1),
                        b = (o && .3 < r) * E(a, -1),
                        S = (o && .3 < c) * E(s, -1),
                        2 < r && (i = 20 * (a < 0 ? -1 : 1) + e),
                        2 < c && (n = 20 * (s < 0 ? -1 : 1) + t));
                  }
                }
              },
              hC.ontouchend = t => {
                let a;
                document.activeElement === document.body && t.preventDefault();
                for (let e of t.changedTouches) {
                  e.identifier === g
                    ? (g = void 0, v || (a = 1), v = 0)
                    : e.identifier === f
                    ? (f = void 0, S = b = 0, m || (a = 1), m = 0)
                    : a = 1;
                }
                t.target === hC && a && e && .02 < (t = z - e) && t < .7 && (k = 1);
              },
              $ = () => {
                c1 = S + (s[4] ? 1 : 0) - (s[5] ? 1 : 0), o1 = b + (s[2] ? 1 : 0) - (s[3] ? 1 : 0);
                let e = navigator.getGamepads()[0];
                e
                  && (B && (u1 += Q * w1(e.axes[3], .3) * 80, v1 += Q * w1(e.axes[2], .3) * 80),
                    c1 += I(e, 12) - I(e, 13) - w1(e.axes[1], .2),
                    o1 += I(e, 14) - I(e, 15) - w1(e.axes[0], .2),
                    I(e, 9) && A(!0),
                    (e = I(e, 3) || I(e, 2) || I(e, 1) || I(e, 0)) && !t && (k = 1),
                    t = e);
              },
              document.onvisibilitychange = onblur = onresize = o,
              A(!0);
          })(),
          (() => {
            let s,
              c,
              o,
              i,
              n,
              f,
              m,
              h,
              u,
              g,
              v,
              d,
              p,
              b = 0,
              S = 0,
              A = 0,
              M = 0,
              I = 1,
              j = 2,
              C = 15,
              Y = () => W((j ? H[g1] : N[28 !== b ? b : 0]).m),
              k = e => {
                1 < j ? (W(H[g1].m).multiplySelf(H[g1].F), U(0, .9 < e1 ? 15 : 1, -2.4)) : (Y(), U(S, A, M)),
                  e && (n = (F - R) / Q, f = (O - q) / Q),
                  R = F,
                  X = T,
                  q = O;
              },
              D = (e, t, a, l) => A1(e, t, I || (E(L(t - e) ** .5 - a) + 1 / 7) * D1(1.5 * l));
            l1 = () => {
              let e,
                t,
                a,
                l,
                r = (k(g),
                  G.r9r(0, 0, 128, 128, 6408, 5121, _1),
                  (() => {
                    let t, a, l, r, s, c = 0, o = 0, i = 0, n = 0, e = 0, f = 0, m = -1;
                    for (t = 0; t < 36; ++t) {
                      for (a = 512 * t, l = 96; l < 416; l += 4) {
                        for (r = 0; r < 2; ++r) {
                          let e = _1[a + l + r + 2];
                          (s = _1[a + l + r]) > n && (n = s),
                            s + e && (m < 0 || m === t) && (m = t, e === g ? ++c : o && o !== e || (o = e, ++i));
                        }
                      }
                    }
                    for (g = m < 0 ? 0 : i > 2 * c ? o : g, c = 36; c < 128; ++c) {
                      for (
                        t =
                          m =
                          i =
                          o =
                            0,
                          a = 512 * c,
                          l = 0;
                        l < 128;
                        ++l
                      ) {
                        s = _1[r = a + 4 * l],
                          l < 64 ? s > o && (o = s) : s > i && (i = s),
                          (s = _1[2 + r]) > m && (m = s),
                          s = _1[1 + r],
                          64 < l ? s > o && (o = s) : s > i && (i = s),
                          (s = _1[3 + r]) > t && (t = s);
                      }
                      (i -= o) * i > e * e && (e = i), (t -= m) * t > f * f && (f = t);
                    }
                    e *= .7,
                      h = E(1 - .01 * p1(L(e), L(f)), .3),
                      e /= 255,
                      n /= 255,
                      f /= 255,
                      Y().invertSelf(),
                      U(e, n, f, 0),
                      S += F,
                      A += n,
                      M += O,
                      k();
                  })(),
                  !j && g === b || (b = g, Y().invertSelf(), U(R, X, q), S = F, A = T, M = O, j = j && (g ? 0 : 1)),
                  (R < -20 || q < 109 ? -25 : -9) > X && (j = 2),
                  1 === g && (H[15].i = R < -15 && q < 0 ? 1 : 0),
                  u = A1(K(u, X, 2), X, j || 8 * L(u - X)),
                  v = D(v, R, .5, 1),
                  d = D(d, u, 2, 1),
                  p = D(p, q, .5, 1),
                  i = K(i, x * (30 < g && g < 35), 2),
                  B
                    ? (e = j + D1(18), f1 = A1(f1, R, e), h1 = A1(h1, q, e), m1 = A1(m1, 1.6 + u, e), v1 = z1(v1))
                    : (f1 = D(f1, v, 1, 2 + i),
                      h1 = D(h1, p + -18 + 5 * i, 1, 2 + i),
                      m1 = D(m1, p1(d + E((-60 - q) / 8, 0, 20) + 13 + 9 * i, 6), 4, 2),
                      e = y1(-6, -L(p - h1)),
                      v1 = S1(v1, 90 - z1(J1(e, t = v - f1) / Z1), I + D1(10)),
                      u1 = S1(u1, 90 - J1(I1(e, t), m1 - d) / Z1, I + D1(10))),
                  u1 = E(u1, -87, 87),
                  I = 0,
                  e = E(c1, -1),
                  t = E(o1, -1),
                  a = w1(I1(e, t) ** .5, .1),
                  J1(e, t));
              for (
                a && (s = 90 - r / Z1),
                  c = S1(c, s, D1(8)),
                  o = K(o, a, 10),
                  P(R, .06 * h * o * J(18.2 * w) + u, q).rotateSelf(0, c),
                  l = 0;
                l < 2;
                ++l
              ) {
                let e = 9.1 * w - V * l;
                W(N[37].m, P(0)).translateSelf(0, o * E(.45 * _(e - V / 2))).rotateSelf(o * _(e) * .25 / Z1, 0);
              }
              C = g ? 5 : K(C, j ? 13 : 19 - 2 * y1(0, X + 10), 2.2),
                n = g || j ? 0 : K(n, 0, 3),
                f = g || j ? 0 : K(f, 0, 3),
                e = (m = j ? 0 : K(m, g ? 7 * E(2 * a) * h : 0, g ? 9 : 1)) * a * L(e) * _(r),
                t = m * a * L(t) * J(r),
                r = B ? (180 + v1) * Z1 : 0,
                a = Q * (n + (t * J(r) - _(r) * e)),
                l = Q * -C,
                e = Q * (f + (t * _(r) + J(r) * e)),
                Y().invertSelf(),
                U(a, l, e, 0),
                S += F,
                A += l,
                M += O,
                k();
            };
          })(),
          requestAnimationFrame(l);
      }
    },
    t = new Image();
  t.onload = t.onerror = g,
    t.src = a,
    (r => {
      let L = 0,
        s = () => {
          let b = 0,
            e = m => {
              let r,
                h,
                s,
                u,
                c,
                o,
                i = 0,
                n = 0,
                g = [],
                f = new Int32Array(768 * m),
                v = 2 ** (a - 9) / m,
                d = V * 2 ** (l - 8) / m,
                p = q * m & -2;
              for (let l = 0; l <= 11; ++l) {
                for (
                  let e = 0, t = +"000001234556112341234556011111111112011111111112000001111112"[12 * L + l];
                  e < 32;
                  ++e
                ) {
                  let a = (32 * l + e) * m;
                  for (r = 0; r < 4; ++r) {
                    if (u = 0, t && (u = S[t - 1].charCodeAt(e + 32 * r) - 40, u += 0 < u ? 106 : 0), u) {
                      if (!(h = g[u])) {
                        let l,
                          r,
                          s = 0,
                          c = 0,
                          o = h = u,
                          i = L < 2
                            ? e => e % 1 * 2 - 1
                            : O1,
                          n = L < 2
                            ? L < 1
                              ? e => e % 1 < .5 ? 1 : -1
                              : e => (e = e % 1 * 4) < 2 ? e - 1 : 3 - e
                            : O1,
                          f = new Int32Array(D + F + N);
                        for (let t = 0, a = 0; D + F + N > t; ++t, ++a) {
                          let e = 1;
                          D > t ? e = t / D : D + F > t || (e = (1 - (e = (t - D - F) / N)) * 3 ** (-T / 16 * e)),
                            a < 0
                            || (a -= 4 * m,
                              r = .00396 * 2 ** ((o + M - 256) / 12),
                              l = .00396 * 2 ** ((o + C - 256) / 12) * (1 + (L ? 0 : .0072))),
                            f[t] = 80
                                * (i(s += r * e ** (I / 32)) * A + n(c += l * e ** (Y / 32)) * j
                                  + (k ? (2 * G1() - 1) * k : 0))
                                * e | 0;
                        }
                        h = g[h] = f;
                      }
                      for (let e = 0, t = 2 * a; h.length > e; ++e, t += 2) f[t] += h[e];
                    }
                  }
                  for (let e, t = 0; m > t; ++t) {
                    r = 0,
                      h = 2 * (a + t),
                      ((e = f[h]) || o)
                      && (c = .00308 * O,
                        1 !== L && 4 !== L || (c *= _(v * h * V * 2) * H / 512 + .5),
                        c = 1.5 * _(c),
                        i += c * n,
                        n += c * (s = (1 - B / 255) * (e - n) - i),
                        e = 4 === L ? n : 3 === L ? s : i,
                        L || (e = (e *= 22e-5) < 1 ? -1 < e ? _(e / 4 * V * 2) : -1 : 1, e /= 22e-5),
                        e *= Q / 32,
                        o = 1e-5 < e * e,
                        r = e * (1 - (s = _(d * h) * R / 512 + .5)),
                        e *= s),
                      p > h || (r += f[1 + h - p] * X / 255, e += f[h - p] * X / 255),
                      E[s = b + h >> 1] += (f[h] = r) / 65536,
                      U[s] += (f[++h] = e) / 65536;
                  }
                }
              }
              b += 768 * m;
            },
            S = [
              [
                "(.15:15:=5:=A:=AF=AFIFIMRMRUY(Y(((((((((((((((((((((((((((((M(M(((((((((((((((((((((((((((((R(R(((((((((((((((((((((((((((((U(U",
                "(059<59<A9<AE<AEHAEHMEHMQMQTY(Y",
                "(5:>A:>AF>AFJAFJMFJMRJMRVMRVY(Y",
                "(:?BFFKNRRWZ^(^((:=@FFILRRUX^(^",
                "Q(M(M(O(Q(R(T(Q(T(R(W(U(T(R(Q(N(W((Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(X]",
                "QN(M(N(M(N(M(N(M((((((((((((((((W(Y(Y(Y(Y(Y(Y(Y(Y(((((((((((((((]",
              ],
              [
                ".(5(.(5(.(5(.(5(.(5(.(5(.(5(.(5",
                "-(5(-(5(-(5(-(5(-(5(-(5(-(5(-(5",
                ",(5(,(5(,(5(,(5(,(5(,(5(,(5(,(5",
                "*(6(*(6(*(6(*(6(*(6(*(6(*(6(*(6",
                "5(E(E(F(H(I(K(H(K(I(N(M(K(I(H(F(A(((((((((((((((((((((((((((((((5(((5(((5(((5(((5(((5(((5(((5",
                "5(6(5(6(5(6(5(6(5((()(((((((((((A(B(A(B(A(B(A(B(A(((5",
              ],
              ["9(((9(((9(((9(((9(((9(((9(((9", "9(((Q(((Q(((Q"],
              ["9(9(9(9(9(9(9(999(9(9(9(999(9(9", "9(9(9(9(9(999(9(((((Q"],
              ["((((Q(((((((Q(((((((Q(((((((Q", "Q((Q((Q((Q((Q((Q((((Q"],
            ][L],
            [A, M, I, j, C, Y, k, D, F, t, T, a, O, B, Q, R, l, X, q, H] = [
              [69, 128, 0, 143, 128, 0, 0, 196, 100, 36, 0, 0, 149, 110, 31, 47, 3, 56, 2, 0],
              [100, 128, 0, 201, 128, 0, 0, 100, 144, 35, 0, 6, 135, 0, 32, 147, 6, 0, 6, 195],
              [255, 116, 85, 255, 116, 37, 14, 64, 144, 73, 99, 0, 136, 15, 32, 0, 0, 66, 6, 0],
              [0, 140, 0, 0, 140, 0, 81, 64, 400, 47, 55, 5, 239, 135, 13, 176, 5, 16, 4, 187],
              [221, 128, 64, 210, 128, 64, 255, 64, 144, 73, 79, 7, 195, 15, 21, 20, 0, 9, 3, 64],
            ][L],
            N = 4 * t ** 2;
          e(5513), e(4562), e(3891), T1(++L < 5 ? s : r);
        },
        E = (Y = new AudioBuffer({ numberOfChannels: 2, sampleRate: 44100, length: 5362944 })).getChannelData(0),
        U = Y.getChannelData(1);
      T1(s);
    })(() => {
      let t = e => c(_((e /= 11) * V), e).rotateSelf(10 * e).scaleSelf(1.002 - e, 1, 1.002 - e),
        a = e =>
          v(
            o(i(), c(0, -e / 2).scale(6, e - 1, 2.2)),
            o(i(), c(0, -e / 2 - 6).scale(4, e - 3, 4)),
            o(i(32, 1), c(0, e / 2 - 9).rotate(90, 0, 90).scale3d(4)),
          ),
        l = (T1(() => {
          let a = 0,
            s = [],
            c = [],
            r = [],
            o = [],
            i = [],
            n = [],
            f = new Int32Array(8),
            m = new Map(),
            h = new Int32Array(f.buffer, 0, 5),
            u = new Float32Array(f.buffer);
          N.map((e, t) => {
            let s,
              l = e => {
                let { x: t, y: a, z: l } = s[e], r = (u[0] = t, u[1] = a, u[2] = l, m.get(e = "" + (s.C ? h : f)));
                return void 0 !== r
                  ? (t = 3 * r, n[t] = (n[t++] + f[5]) / 2, n[t] = (n[t++] + f[6]) / 2, n[t] = (n[t] + f[7]) / 2)
                  : (m.set(e, r = m.size), o.push(t, a, l, u[3]), i.push(f[4]), n.push(f[5], f[6], f[7])),
                  r;
              };
            for (s of (u[3] = 40 === t ? -12 : 41 === t ? -25 : t, e.o)) {
              let { x: e, y: t, z: a } = q1(s);
              f[4] = 0 | s.u, f[5] = 32767 * e, f[6] = 32767 * t, f[7] = 32767 * a;
              for (let e = 2, t = l(0), a = l(1); s.length > e; ++e) r.push(t, a, a = l(e));
            }
            e.o = 0, e.s = a, e.D = a = r.length;
          });
          for (let e of [M, G]) {
            e.b11(34962, e.c1b()),
              e.b2v(34962, new Float32Array(o), 35044),
              e.v7s(0, 4, 5126, !1, 0, 0),
              e.b11(34962, e.c1b()),
              e.b2v(34962, new Int16Array(n), 35044),
              e.v7s(1, 3, 5122, !0, 0, 0),
              e.b11(34962, e.c1b()),
              e.b2v(34962, new Uint32Array(i), 35044),
              e.v7s(2, 4, 5121, !0, 0, 0),
              e.b11(34963, e.c1b()),
              e.b2v(34963, new Uint16Array(r), 35044),
              e.e3x(0),
              e.e3x(1),
              e.e3x(2);
          }
          try {
            let [e, t, a, l, r] = JSON.parse(localStorage.spdnt22);
            s = e, c = t, g1 = a, t1 = l, w = r;
          } catch {}
          H.map((e, t) => e.g = e.h = e.i = 14 !== t && s[t] ? 1 : 0),
            x1.map((e, t) => e.i = c[t] ? 1 : 0),
            Q1(),
            e1 = i1 || 14 !== g1 ? 1 : 0,
            T1(g);
        }),
          n(11, e => Y1(j1(C1(18), t(e), f(1, 1, .8, .2)).reverse(), j1(C1(18), t(e + 1), f(1, 1, .8, .2)), 1)).flat()),
        e = [
          ...o(i(), c(0, -3).scale(11, 1.4, 3), f(.9, .9, .9, .2)),
          ...o(i(), c(0, -2.2).scale(7.7, .5, 4), f(.5, .5, .5, .2)),
          ...n(12, e => o(i(), S.translate(e - 5.5, 4.4).scale(.1, .1, 2), f(.6, .5, .4, .3))).flat(),
          ...v(
            o(i(6), S.rotate(90).scale(6, 8, 6), f(.3, .6, .6, .3)),
            o(i(4, 0, .01), c(0, 6).scale(12, 2, .75).rotate(0, 45), f(.3, .6, .6, .3)),
            o(i(6), S.rotate(90).scale(5, 12, 5), f(.3, .6, .6, .3)),
            ...[-5, 0, 5].map(e => o(i(5), c(e, 2.5).rotate(90, 0, 36).scale(1.8, 10, 1.8), f(.3, .6, .6, .3))),
          ),
        ],
        r = v(
          o(i(), c(0, -.5, 1).scale(1.15, 1.2, 6.5), f(.25, .25, .35, .3)),
          v(
            o(i(3), c(0, 0, -5.5).scale(3, 2), f(.6, .3, .4, .3)),
            o(i(), c(0, 0, -3.65).scale(2.5, 3), f(.6, .3, .4, .3)),
          ),
          ...[-1, 1].map(e => o(i(), c(1.2 * e, -.5, 1).scale(.14, .3, 6.5), f(.7, .2, 0, .3))),
        );
      m(),
        s([d.slice(1)], c(-2).scale3d(3).rotate(90, 0)),
        m(),
        h(c(-5.4, 1.5, -19).rotate(0, -90)),
        [-15, 15].map((e, t) => {
          s(i(), c(0, 0, t ? 22 : -23).scale(3, 1, 8), f(.9, .9, .9, .2)),
            s(i(), c(0, 6.3, e).scale(4, .3, 1), f(.3, .3, .3, .4)),
            s(i(), c(0, 1, e).scale(3, .2, .35), f(.5, .5, .5, .3));
        }),
        s(i(), c(-5, -.2, -26).scale(3.2, 1, 2.5).skewX(3), f(.8, .8, .8, .2)),
        s(i(), c(3, 1.5, -20).scale(.5, 2, 5), f(.7, .7, .7, .2)),
        s(i(), c(-3.4, -.2, -19).scale(2, 1, 1.5).rotate(0, -90), f(.75, .75, .75, .2)),
        s(i(5), c(-5.4, 0, -19).scale(2, 1, 2).rotate(0, -90), f(.6, .3, .3, .4)),
        s(v(
          K1(
            o(i(6, 0, 0, .3), c(8, -3, -4).scale(13, 1, 13), f(.7, .7, .7, .2)),
            v(
              o(i(6, 0, 0, .3), c(0, -.92).scale(13, 2, 13), f(.8, .8, .8, .2)),
              o(i(), S.rotate(0, 60).translate(14, .5, -1).scale(2.4, 5, 2), f(.5, .5, .5, .5)),
            ),
            o(
              i(),
              S.rotate(0, 60).translate(14.8, -1.46, -1).rotate(-30).translate(0, -1).scale(4.03, 1.6, 4.5),
              f(.8, .2, .2, .5),
            ),
            o(i(6), c(0, -8).scale(9, 8, 7), f(.2, .1, .4, .5)),
          ),
          o(i(5), S.scale(5, 30, 5), f(.4, .2, .6, .5)),
          o(i(5, 0, 1.5), c(0, 1).scale(4.5, .3, 4.5), f(.7, .5, .9, .2)),
          o(i(6), c(15, -1.5, 4).scale(3.5, 1, 3.5), f(.5, .5, .5, .5)),
        )),
        h(c(15, -2, 4)),
        s(i(), c(-18.65, -3, 55).scale(2.45, 1.4, 2.7), f(.9, .9, .9, .2)),
        h(c(-55, -1.1, 46).rotate(0, 90)),
        s(i(7), c(-57, -2.6, 46).scale(4, 1, 4), f(.8, .8, .8, .3)),
        s(i(6), c(-61.3, -2.4, 49).scale(3, 1, 5), f(.4, .6, .6, .3)),
        s(e, c(-53, 0, 55)),
        s(i(), c(-88.3, -5.1, 55).rotate(-30).scale(5, 1.25, 4.5), f(.7, .7, .7, .2)),
        s(i(3, 0, -.5), c(-88.4, -3.9, 55).rotate(0, -90, 17).scale(3, 1.45, 5.9), f(.8, .8, .8, .2)),
        s(v(
          K1(
            o(i(), c(-100, -2.4, 55).scale(8, .9, 8), f(.8, .8, .8, .2)),
            o(i(), c(-113, -2.6, 55).scale(6.2, 1.1, 3).skewX(3), f(.8, .8, .8, .2)),
            o(i(), c(-100, -2.6, 70).scale(3, 1.1, 7), f(.8, .8, .8, .2)),
            o(i(), c(-96, -2.6, 73).rotate(0, 45).scale(3, 1.1, 5), f(.8, .8, .8, .2)),
            o(i(6), c(-88.79, -2.6, 80.21).scale(6, 1.1, 6).rotate(0, 15), f(.6, .6, .6, .3)),
            o(i(), c(-100, -1.1, 82.39).rotate(-15, 0).scale(3, 1.1, 6), f(.8, .8, .8, .2)),
            o(i(), c(-100, .42, 92).scale(3, 1.1, 4.1), f(.8, .8, .8, .2)),
          ),
          o(i(8), c(-100, -1, 55).scale(7, .9, 7), f(.3, .3, .3, .4)),
          o(i(8), c(-100, -2, 55).scale(4, .3, 4), f(.4, .4, .4, .5)),
          o(i(8, 0, -3.1), c(-100, -3, 55).scale(.4, 1, .4), f(.4, .4, .4, .5)),
        )),
        s(v(
          o(i(), c(-100, 1, 63).scale(7.5, 4), f(.5, .5, .5, .4)),
          o(i(), c(-100, 0, 70).scale(2, 2, 10), f(.5, .5, .5, .4)),
          o(i(20, 1), c(-100, 2, 70).scale(2, 2, 10).rotate(90, 0), f(.5, .5, .5, .4)),
        )),
        d.map(({ x: t, z: a }) => {
          s(i(6), c(3 * t, 3, 15 * a).scale(.7, 4, .7), f(.6, .3, .3, .4)),
            s(i(6), c(7 * t - 100, -3, 7 * a + 55).scale(1, 8.1), f(.6, .15, .15, .8)),
            [4, -.4].map(e => s(i(6), c(7 * t - 100, e, 7 * a + 55).scale(1.3, .5, 1.3), f(.4, .2, .2, .8))),
            s(i(14, 1), c(9 * t - 38.9, -7.3, 11 * a + 17).scale(1, 4), f(.25, .25, .25, 1)),
            [1.5, 8].map(e =>
              s(i(17, 1), c(9 * t - 38.9, e - 11.3, 11 * a + 17).scale(1.5, .5, 1.5), f(.6, .6, .6, .3))
            );
        }),
        n(7, e => {
          s(
            i((23 * e + 1) % 5 + 5, 0, .5),
            c(5 * _(e) - 101 + e, -2.3 - e, 44.9 - 2.8 * e).scaleSelf(5 + e / 2, 1 + e / 6, 5 + e / 3),
            f(.5 - e / 17, .5 - (1 & e) / 9, .6, .3),
          );
        }),
        s(i(), c(-87, -9.5, 24).scale(7, 1, 3), f(.4, .5, .6, .4)),
        s(i(4), c(-86, -9.2, 27).scale(5, 1, 5), f(.5, .6, .7, .3)),
        s(i(12, 1), c(-86, -9, 31).scale(1.5, 1, 1.5), f(.3, .3, .4, .1)),
        h(c(-86, -7.5, 31)),
        s(
          v(
            K1(
              o(i(5), c(0, 0, -7).scale(2, 1.2, 2), f(.2, .4, .7, .3)),
              o(i(5), S.scale(9, 1.2, 9), f(0, .2, .3, .5)),
              o(i(), S.scale(11, 1, 13), f(.3, .4, .6, .3)),
            ),
            o(i(5), S.scale(5.4, 5, 5.4), f(0, .2, .3, .5)),
          ),
          c(-38.9, -11.3, 17),
        ),
        h(c(-38.9, -9.6, 10)),
        s(
          v(
            K1(
              o(i(6), c(0, 0, -18).scale(15, 1.2, 15), f(.7, .7, .7, .3)),
              o(i(), S.scale(4, 1.2, 6), f(.45, .4, .6, .3)),
            ),
            ...n(6, t =>
              n(
                6,
                e =>
                  o(
                    i(6),
                    c(4.6 * e - 12 + 2 * (1 & t), 0, 4.6 * t + 2 * _(4 * e) - 32).scale(2, 5, 2),
                    f(.7, .7, .7, .3),
                  ),
              )).flat(),
          ),
          c(-38.9, -11.3, -1),
        ),
        s(i(5), c(-84, -2, 85).scale(4, .8, 4).rotate(0, 10), f(.8, .1, .25, .4)),
        h(c(-84, -.7, 85).rotate(0, 45)),
        s(
          v(
            K1(o(i(), c(26.5, -1.6, 10).scale(20, 2.08, 3)), o(i(), c(26.5, -.5, 10).scale(19, 2, .5))),
            ...n(4, e => o(i(), c(13 + 9 * e + (1 & e), -.8, 9).scale(1.35, 1.35, 9))),
            ...n(3, e => o(i(), c(17 + 9 * e, -.8, 9).scale(1.35, 1.35, 9))),
          ),
          c(-123, .2, -12),
          f(.5, .5, .6, .2),
        ),
        h(c(-116, -1.4, -18).rotate(0, 180)),
        s(i(6), c(-116, -2.6, -16.5).scale(3.2, .8, 3), f(.6, .5, .7, .2)),
        s(i(), c(-116, -2.6, -12).scale(3.2, 1.1, 4).skewX(3), f(.8, .8, .8, .2)),
        s(i(), c(-115.5, -17, -12).scale(.5, 15, 2.2), f(.6, .6, .6, .3)),
        s(i(8), c(-114, -17, -2).scale(2, 15, 2), f(.6, .6, .6, .3)),
        s(i(8), c(-79, -17, -2).scale(2, 15, 2), f(1, 1, 1, .3)),
        s(i(), c(-77, -17, -50.5).scale(2.2, 15, .5), f(.6, .6, .6, .3)),
        s(v(
          o(i(12), c(-77, -14.5, -12).scale(4, 17.5, 4), f(.7, .7, .7, .2)),
          o(i(12), c(-77, 3.1, -12).scale(3, 5, 3), f(.4, .5, .6, .2)),
          o(i(), c(-79, .1, -12).scale(3.5, 2, 1.3), f(.4, .5, .6, .2)),
          o(i(), c(-77, .1, -14).scale(1.5, 2, 2), f(.4, .5, .6, .2)),
        )),
        s(v(
          o(i(), c(-93, -5.8, -40).scale(9, 1, 5), f(.8, .8, .8, .1)),
          o(i(9), c(-98, -5.8, -40).scale(3, 8, 3), f(.7, .7, .7, .2)),
        )),
        s(i(), c(-84.9, -4.3, -40).rotate(12).scale(6, 1, 3), f(.6, .6, .6, .3)),
        s(i(9), c(-98, -18.4, -40).scale(2.5, 13.5, 2.5), f(.5, .5, .5, .3)),
        h(c(-98, -4.4, -40).rotate(0, 90)),
        [-1, 1].map((t, a) => {
          s(
            v(
              o(i(), c(-4 * t, 3.5, -.5).scale(4, 4, .7), f(.5, .5, .5, .4)),
              o(i(), S.scale(3, 3, 10), f(.6, .24, .2, .5)),
              o(i(32, 1), c(0, 3, -5).scale(3, 4, 10).rotate(90, 0), f(.6, .24, .2, .5)),
              o(i(5), c(-5.3 * t, 7).rotate(90, 0).scale(1.7, 5, 1.7), f(.6, .24, .2, .5)),
              o(i(5), c(-5.3 * t, 3.8).rotate(90, 0, 35).scale(.75, 5, .75), f(.6, .24, .2, .5)),
            ),
            c(t - 100, .7, 97),
          ),
            s(i(12, 1), c(-7.5 * t - 100, 3.7, 96).scale(.8, 4, .8), f(.6, .24, .2, .5)),
            [7.2, 1.5].map(e => s(i(15, 1), c(-7.5 * t - 100, e + .7, 96).scale(1.1, .5, 1.1), f(.5, .24, .2, .4))),
            s(l, c(-8 * t, 1, 85).scale(1.2, 10, 1.2).rotate(0, 90 * t + 90)),
            s(l, c(-5 * t - 100, 1.7, 114.5).scale(1.2, 10, 1.2).rotate(0, 90 * t - 90)),
            n(5, e => s(l, c(18.5 * (a - .5), 0, 4.8 * e - 9.5).rotate(0, 180 - 180 * a).scale(1.2, 10, 1.2)));
        }),
        s(v(
          o(i(), c(-82.07, .8, 106).scale(11, .9, 2.2), f(.7, .7, .7, .1)),
          o(i(45, 1), c(-81, .7, 106).scale3d(7.7), f(.7, .7, .7, .1)),
        )),
        s(i(), c(-58, 1, 106).scale(2, .65, 2), f(.7, .7, .7, .2)),
        s(i(), c(-50.7, 1, 99).scale(2, .65, 1), f(.7, .7, .7, .2)),
        s(i(), c(-42, .4, 91).scale(5, 1, 2.5), f(.7, .7, .7, .3)),
        s(i(), c(-34.2, .4, 91).scale(3, 1, 3), f(.7, .7, .7, .3)),
        s(i(5), c(-34, .2, 96).scale(3, 2, 4).rotate(-20, 0), f(.2, .5, .5, .6)),
        h(c(-34, 2.7, 96).rotate(-12, 0)),
        s(v(
          K1(
            o(i(6, 0, 0, .6), c(-100, .7, 105.5).scale(8, 1, 11), f(.7, .7, .7, .2)),
            o(i(), c(-101.5, .7, 93.5).scale(10.5, 1, 2), f(.7, .7, .7, .2)),
          ),
          o(i(5), c(-100, .7, 113).scale(4, 3, 4), f(.7, .7, .7, .2)),
        )),
        n(3, e => {
          s(a(16), c(-77, -9, -12 * e - 20).rotate(0, 90), f(.6, .6, .6, .3)),
            s(a(16), c(12 * e - 109, -9, -12), f(.6, .6, .6, .3)),
            s(
              a(24.7 - .7 * (1 & e)),
              c(6 * e - 6, 4 - (1 & e), 111 - .2 * (1 & e)),
              1 & e ? f(.5, .5, .5, .3) : f(.35, .35, .35, .5),
            );
        }),
        s(v(
          o(i(6, 0, 0, .3), c(0, -.92, 95).scale(14, 2, 14), f(.8, .8, .8, .2)),
          o(i(5), c(0, 0, 95).scale3d(6), f(.3, .3, .3, .5)),
        )),
        h(c(0, 1.7, 82).rotate(0, 180)),
        s(i(5), c(0, -15.7, 82).scale(2.5, 17, 2.5).rotate(0, 35), f(.5, .3, .3, .4)),
        s(i(6), c(0, 16, 121).scale(2.5, 1, 2.1).rotate(0, 90), f(.5, .6, .7, .3)),
        s(i(), c(0, 16, 127.8).scale(1.5, 1, .7), f(.5, .6, .7, .3)),
        s(i(7), c(0, 15.1, 133).scale(5, 2, 5), f(.4, .5, .6, .4)),
        s(v(
          K1(
            o(i(), c(0, 16, 110.5).scale(12, 1, 3), f(.5, .3, .3, .4)),
            o(i(), c(0, 16, 111).scale(3, 1, 3.8), f(.5, .3, .3, .4)),
          ),
          o(i(5), c(0, 16, 103.5).scale(5.5, 5, 5.5), f(.5, .3, .3, .4)),
        )),
        u(c(-.5, 2.8, -20), [0, 0, 2.5], [0, -3, 2.5]),
        u(c(0, 2.8), [5, 10, 3], [-5, 10, 3], ...C1(18).map(({ x: e, z: t }) => [7 * e, 10 * t, 4.5 - 2 * L(e)])),
        u(c(0, 3, 95), ...C1(9).map(({ x: e, z: t }) => [9 * e, 9 * t, 4])),
        u(c(0, 19, 134), [0, 0, 3.5]),
        u(c(-38.9, -8.4, -21), [-7, -2.5, 6], [6, -3, 6], [0, -5, 7]),
        u(c(-89, .2, 80), [0, 0, 6]),
        u(c(-100, .2, 55), [0, 0, 7.5], [-8, 0, 3.5], [-12, 0, 3.5], [-15, 0, 3.5]),
        u(c(-115, .2, -12), [0, 0, 3.5]),
        u(c(-93, -3, -40).rotate(4), [0, -2, 3.5], [0, 2, 3.5]),
        m(),
        s(i(5), c(0, -.2).scale(5, 1, 5), f(.6, .65, .7, .3)),
        h(c(0, 1.2)),
        n(2, () => {
          m(),
            d.map(({ x: e, z: t }) => {
              s(i(11, 1), c(4 * e, 4, 4 * t).scale(.8, 3, .8), f(.5, .3, .7, .6)),
                s(i(), c(4 * e, 7, 4 * t).scale(1, .3), f(.5, .5, .5, .3));
            }),
            s(v(
              o(i(), S.scale(5, 1, 5), f(.8, .8, .8, .3)),
              ...[-1, 1].map(e => o(i(25, 1), c(5 * e, .2).rotate(-30 * e).scale(4, 1, 3), f(.8, .8, .8, .3))),
            )),
            s(i(), c(0, -3).scale(8, 2, 8), f(.4, .4, .4, .3));
        }),
        m(),
        s(v(
          K1(
            o(i(), S.scale(1.5, 1, 5), f(.9, .9, .9, .2)),
            o(i(6), S.scale(4, 1, 5), f(.9, .9, .9, .2)),
            o(i(), c(0, -2).scale(2, 3.2, 1.9), f(.3, .8, .5, .5)),
            o(i(16, 1, 0, 4), S.scale(1, 1, 1.5).rotate(0, 90), f(.9, .9, .9, .2)),
          ),
          o(i(), S.scale(1.3, 10, 1.3), f(.2, .7, .4, .6)),
        )),
        u(c(0, 2.8), [0, 0, 4.5]),
        m(),
        s(i(3), c(-23, -1.7, 55.8).scale(5, .7, 8.3), f(.3, .6, .6, .2)),
        s(i(8), c(-23, -2.2, 66.5).scale(1.5, 1.2, 1.5), f(.8, .8, .8, .2)),
        s(i(), c(-23, -3, 55).scale(5.2, 1.7, 3), f(.5, .5, .5, .3)),
        s(i(), c(-23, -2.2, 62).scale(3, 1, 4), f(.5, .5, .5, .3)),
        h(c(-23, -.5, 66.5)),
        m(),
        s(i(), c(-22.55, -3, 55).scale(1.45, 1.4, 2.7), f(.7, .7, .7, .2)),
        s(v(o(i(), S.scale(3, 1.4, 2.7)), o(i(), S.scale(1.2, 8, 1.2))), c(-33, -3, 55), f(.7, .7, .7, .2)),
        m(),
        s(v(
          o(i(), c(-27, -3, 55).scale(3, 1.4, 2.7), f(.9, .9, .9, .2)),
          o(i(), c(-27, -3, 55).scale(1, 3), f(.9, .9, .9, .2)),
        )),
        s(i(), c(-39, -3, 55).scale(3, 1.4, 2.7), f(.9, .9, .9, .2)),
        m(),
        s(i(6), c(-44.5, 0, 55).rotate(0, 0, 90).scale(5.9, .5, 5.9), f(.7, .7, .7, .4)),
        m(),
        [0, 12, 24].map(e =>
          s(i(), c(e - 76.9, e / -16 - 10, 24).rotate(0, 0, -2).skewX(-2).scale(2.8, 1.4, 3), f(.2, .5, .6, .2))
        ),
        m(),
        [6, 18].map(e =>
          s(i(), c(e - 76.9, e / -16 - 10, 24).rotate(0, 0, -2).skewX(-2).scale(2.8, 1.4, 3), f(.1, .4, .5, .2))
        ),
        m(),
        s(
          v(
            K1(
              o(i(5), c(0, 2).scale(5, 7, 5).skewY(8), f(.2, .4, .5, .5)),
              o(i(5), c(0, 6).scale(1.1, 7, 1.1).skewY(-8), f(.25, .35, .5, .5)),
              o(i(5), c(0, 9).scale(.6, 7, .6).skewY(8), f(.35, .3, .5, .5)),
            ),
            o(i(5), S.scale(4, 8, 4), f(.2, .4, .5, .5)),
            o(i(5), c(0, 5).scale(1.5, 1.5, 8).rotate(90, 0, 35), f(.2, .4, .5, .5)),
          ),
          c(-38.9, -11.3, 17),
        ),
        u(c(-39.1, -.6, 17).rotate(11), ...C1(15).map(({ x: e, z: t }) => [3 * e, 3 * t, 1.2])),
        m(),
        n(2, e => s(r, c(9 * e - 110 + (1 & e), 1.9, -12))),
        m(),
        n(2, e => s(r, c(9 * (e + 2) - 110 + (1 & e), 1.9, -12))),
        m(),
        n(3, e => s(r, c(9 * e - 106, 1.9, -12))),
        n(4, e => {
          m(),
            s(
              i(6),
              c(-14.6 - 4.8 * e - (2 < e ? 2 : 0), -e / 2.5 - .1, -21.5).rotate(0, 0, 3.5).skewX(3.5).scale(
                2.6,
                1,
                2.5,
              ),
              f(.5 - e / 8, e / 12 + .5, .7, .3),
            );
        }),
        [f(.1, .55, .45, .2), f(.2, .5, .5, .3), f(.3, .45, .55, .4)].map((e, t) => {
          m(),
            s(i(), c(-23.5, .5, 91 + 6.8 * t).scale(1 === t ? 2 : 3.3, 1, 3.3), e),
            2 === t && s(i(), c(-29.1, .4, 91).scale(2.1, 1, 3), f(.7, .7, .7, .3)),
            1 === t && s(i(), c(-16.1, .5, 103.5).rotate(-3.5).scale(3.9, .8, 2).skewX(-1), f(.6, .6, .7, .3));
        }),
        m(),
        s(i(5), S.scale(5, 1.1, 5), f(.5, .3, .3, .4)),
        s(i(5), S.scale(5.5, .9, 5.5), f(.25, .25, .25, .4)),
        h(c(0, 1.5, -1).rotate(0, 180)),
        n(4, t => {
          m(),
            n(
              7,
              e => s(o(i(9, 1), c((2 < t ? 3.5 : 4) * (e / 6 - .5), 3).scale(.2, 2 < t ? 4 : 3, .2), f(.3, .3, .38))),
            );
        }),
        m(),
        s(e),
        m(),
        s(i(15, 1), c(-7.5).rotate(0, 90).scale(3, 2.3, 3), f(.4, .4, .4, .3)),
        s(i(10), c(-7.5).rotate(0, 90).scale(2, 2.5, 2), f(.3, .8, .7, .3)),
        s(i(5), c(-7.5).rotate(0, 90).scale(1, 3), f(.5, .5, .5, .5)),
        h(c(-7.5).rotate(0, 90).translate(0, 3.4).rotate(0, 180)),
        [-1, 1].map(e => s(l, S.rotate(90 * e, 180, 90).translate(0, 5).rotate(40).scale(1.3, 10, 1.3))),
        s(v(o(i(10), S.scale(6, 2, 6), f(.1, .6, .5, .3)), o(i(10), S.scale(3.3, 6, 3.3), f(.1, .6, .5, .5)))),
        u(c(-5, 4), [0, -1.2, 1.7], [0, 1.2, 1.7]),
        m(),
        s(i(3), c(0, -3, 118.8).scale(.8, .8, 8).rotate(90, 0, 60), f(.5, .3, .3, .4)),
        [22, 30].map(e => {
          s(i(6), c(0, 16, e + 95).scale(3, 1, 2.3).rotate(0, 90), f(.7, .7, .7, .4)),
            s(i(), c(0, 6.2, e + 95).scale(.5, 11, .5), f(.5, .3, .3, .4));
        }),
        m(),
        s(v(
          o(i(45, 1), S.scale(7.5, 1, 7.5), f(.45, .45, .45, .2)),
          o(i(), c(0, 0, -5.5).scale(1.5, 3, 2.7), f(.45, .45, .45, .2)),
        )),
        s(i(8), c(0, 2).scale(3, 1.5, 3).rotate(0, 22), f(.7, .7, .7, .1)),
        s(i(5), c(0, 2).scale(1, 2), f(.3, .3, .3, .2)),
        u(c(0, 3), ...C1(14).map(({ x: e, z: t }) => [5.6 * e, 5.6 * t, 2])),
        m(),
        [-1, 1].map(e => s(l, S.rotate(0, 90).translate(-5 * e, 1, -.5).scale(1.2, 10, 1.2).rotate(0, 90 * e + 90))),
        s(v(o(i(28, 1), c(0, 2).scale(7.5, 1, 7.5), f(.35, 0, 0, .3)), o(i(), S.scale(9, 5, 2), f(.3, 0, 0, .3)))),
        s(o(i(28, 1), S.scale(7.5, 1, 7.5), f(.45, .45, .45, .2))),
        s(o(i(5), c(0, 1).scale(1, .2), f(.3, .3, .3, .2))),
        m(),
        s(v(
          o(i(28, 1), c(0, 2).scale(7.5, 1, 7.5), f(.35, 0, 0, .3)),
          o(i(), c(7).scale(9, 5, 2), f(.3, 0, 0, .3)),
          o(i(), c(0, 0, 7).scale(2, 5, 9), f(.3, 0, 0, .3)),
        )),
        s(o(i(28, 1), S.scale(7.5, 1, 7.5), f(.45, .45, .45, .2))),
        s(o(i(5), c(0, 1).scale(1, .2), f(.3, .3, .3, .2))),
        m(),
        s(v(
          o(i(28, 1), c(0, 2).scale(7.5, 1, 7.5), f(.35, 0, 0, .3)),
          o(i(), c(7).scale(9, 5, 2), f(.3, 0, 0, .3)),
          o(i(), c(0, 0, -7).scale(2, 5, 9), f(.3, 0, 0, .3)),
        )),
        s(o(i(28, 1), S.scale(7.5, 1, 7.5), f(.45, .45, .45, .2))),
        s(o(i(5), c(0, 1).scale(1, .2), f(.3, .3, .3, .2))),
        n(2, () => {
          m(),
            s(v(
              o(i(30, 1, 1.15, 1), c(0, -3).scale(3.5, 1, 3.5), f(.7, .4, .25, .7)),
              o(i(30, 1, 1.3, 1), c(0, -2.5).scale(2.6, 1, 3), f(.7, .4, .25, .2)),
              o(i(), c(4, -1.2).scale3d(2), f(.7, .4, .25, .3)),
            )),
            h(c(0, -3, 4));
        }),
        m(),
        s(k1(20), c(0, 1).scale3d(.5), f(1, .3, .4)),
        s(k1(30), S.scale(.65, .8, .55), f(1, .3, .4)),
        s(i(), c(0, .9, .45).scale(.15, .02, .06), f(.3, .3, .3)),
        [-1, 1].map(e => {
          s(l, S.rotate(0, 0 < e ? 180 : 0).translate(.2, 1.32).rotate(-30).scale(.2, .6, .2), f(1, 1, .8)),
            s(
              o(v(i(15, 1), o(i(), c(0, 0, 1).scale(2, 2, .5))), S.rotate(-90, 0).scale(.1, .05, .1), f(.3, .3, .3)),
              c(.2 * e, 1.2, .4).rotate(0, 20 * e, 20 * e),
            );
        }),
        [-1, 1].map(e => {
          m(), s(i(20, 1), c(.3 * e, -.8).scale(.2, .7, .24), f(1, .3, .4));
        }),
        m(),
        s(
          k1(30, 24, (e, t, a) => {
            let l = t / 24, r = e * V * 2 / 30, s = _(l ** .6 * V / 2);
            return e = l * l * _(e * V * 14 / 30) / 4,
              23 < t
                ? { x: a.C = 0, y: -.5, z: 0 }
                : { x: J(r) * s, y: J(l * V) - l - e, z: _(r) * s + _(e * V * 2) / 4 };
          }),
          S.scale(.7, .7, .7),
          f(1, 1, 1),
        ),
        [-1, 1].map(e => s(k1(12), c(.16 * e, .4, -.36).scale3d(.09))),
        m(),
        s(i(6, 1), S.scale(.12, 1.2, .12), f(.3, .3, .5, .1)),
        s(i(10), c(0, .8).scale(.2, .3, .2), f(1, .5, .2)),
        s(i(3), c(0, -1).rotate(90, 90).scale(.3, .4, .3), f(.2, .2, .2, .1));
    });
});
