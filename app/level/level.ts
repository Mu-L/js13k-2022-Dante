import { csg_subtract, csg_polygons, csg_union, csg_union_op } from "../geometry/csg";
import {
  material,
  GBox,
  cylinder,
  polygons_transform,
  type Polygon,
  sphere,
  horn,
  polygon_regular,
  polygon_transform,
} from "../geometry/geometry";
import { identity } from "../math/matrix";
import { meshAdd, meshTranslation } from "./scene";

const pavement = (): Polygon[] => {
  return polygons_transform(GBox, identity.translate(0, -2).scale(1100, 0.5, 1100), material(1, 1, 1));
};

const MATERIAL_DEVIL = material(1, 0.3, 0.4);

export const demon = () => {
  meshTranslation(0, 1.3, -15);

  const rhorn = meshAdd(
    polygons_transform(
      horn(),
      identity.translate(0.2, 1.32, 0).rotate(0, 0, -30).scale(0.2, 0.6, 0.2),
      material(1, 1, 0.8),
    ),
  );

  // left horn
  meshAdd(polygons_transform(rhorn, identity.rotate(0, 180, 0)));

  // head
  meshAdd(polygons_transform(sphere(30), identity.translate(0, 1, 0).scale(0.5, 0.5, 0.5), MATERIAL_DEVIL));

  const eye = polygons_transform(
    csg_polygons(csg_subtract(cylinder(15, 1), polygons_transform(GBox, identity.translate(0, 0, 1).scale(2, 2, 0.5)))),
    identity.rotate(-90, 0, 0).scale(0.1, 0.05, 0.1),
    material(0.3, 0.3, 0.3),
  );

  // right eye
  meshAdd(polygons_transform(eye, identity.translate(0.2, 1.2, 0.4).rotate(0, 20, 20)));

  // left eye
  meshAdd(polygons_transform(eye, identity.translate(-0.2, 1.2, 0.4).rotate(0, -20, -20)));

  // mouth
  meshAdd(polygons_transform(GBox, identity.translate(0, 0.9, 0.45).scale(0.15, 0.02, 0.06), material(0.3, 0.3, 0.3)));

  // body
  meshAdd(polygons_transform(sphere(15), identity.translate(0, 0, 0).scale(0.7, 0.8, 0.5), MATERIAL_DEVIL));

  // Right leg
  const rleg = meshAdd(
    polygons_transform(cylinder(10, 1), identity.translate(-0.3, -1, 0).scale(0.2, 0.5, 0.2), MATERIAL_DEVIL),
  );

  // Left leg
  meshAdd(polygons_transform(rleg, identity.rotate(0, 180)));
};

export const mainScene = () => {
  const base = polygons_transform(cylinder(6), identity.scale(10, 1, 24), material(1, 1, 1));

  meshAdd(
    csg_polygons(
      csg_subtract(
        base,
        csg_union([
          polygons_transform(base, identity.translate(0, 0.5).scale(0.9, 0.5, 0.9), material(0.8, 0.8, 0.8)),
          polygons_transform(base, identity.scale(0.2, 3, 0.2), material(1, 1, 1)),
        ]),
      ),
    ),
  );

  polygon_transform(polygon_regular(6), identity.scale(20 * 0.2, 1, 44 * 0.2)).map(({ x, z }) => {
    meshAdd(polygons_transform(cylinder(8), identity.translate(x, 3, z).scale(0.3, 3, 0.3), material(0.8, 0, 0.8)));
  });

  meshAdd(weirdObject());
  // meshAdd(pavement());
};

//  return [...polygons_transform(corridor(), identity.translate(0, 10, 0)), ...pavement(), ...weirdObject()];

// const c = corridor().map((t) => solid_transform(t, identity.translate(0, 10, 0)));

// const merged: Polygon[][] = [];
// for (let z = -8; z < 8; ++z) {
//   for (let x = -8; x < 8; ++x) {
//     for (let y = -2; y < 2; ++y) {
//       for (const solid of c) {
//         merged.push(solid_transform(solid, identity.translate(x * 20, y * 20, z * 20).scale(1, 1, 0.3)));
//       }
//     }
//   }
// }

// return [...merged, pavement(), weirdObject()];

// const materialWhite = material(1, 1, 1);
// const material0 = material(1, 0.3, 0);
// const material1 = material(0, 0.5, 0.7);
// const material2 = material(0, 0.2, 0.9);
// const material3 = material(0.2, 0, 0.9);
// const material4 = material(0.4, 0.9, 0);
// const material5 = material(0.4, 0, 0.9);

// const corridor = (): Polygon[] => {
//   // const p = csg_union([
//   //   csg_union([
//   //     solid_transform(solid_box(material4), identity.rotate(20).scale(1.5, 6.9, 4)),
//   //     solid_transform(solid_box(material5), identity.rotate(20).scale(1.5, 5.9, 10)),
//   //   ]),
//   //   csg_subtract(
//   //     solid_transform(solid_box(material0), identity.scale(3.5, 3.5, 20)),
//   //     csg_union([
//   //       solid_transform(solid_box(material1), identity.scale(3, 3, 22)),
//   //       ...integers_map(6, (i) =>
//   //         solid_transform(
//   //           solid_cylinder(material1, 6),
//   //           identity
//   //             .translate(0, 0.6, i * 6 - 14)
//   //             .rotate(0, 0, 90)
//   //             .scale(2.5, 4, 1.5),
//   //         ),
//   //       ),
//   //     ]),
//   //   ),
//   // ]);

//   // const p = csg_subtract(
//   //   solid_transform(solid_cylinder(material0, 8, 1.1), identity.scale(3.5, 3.5, 20).rotate(90, 0, 20)),
//   //   csg_union([
//   //     solid_transform(solid_cylinder(material1, 8, 1.1), identity.scale(3, 3, 22).rotate(90, 0, 20)),
//   //     ...integers_map(6, (i) =>
//   //       solid_transform(
//   //         solid_cylinder(material1, 6, 0.5),
//   //         identity
//   //           .translate(0, 0, i * 6 - 14)
//   //           .rotate(0, 0, 90)
//   //           .scale(1, 4, 1),
//   //       ),
//   //     ),
//   //   ]),
//   // );

//   const p = csg_subtract(
//     polygons_transform(GBox, identity.scale(3.5, 3.5, 20), material0),
//     csg_union([
//       polygons_transform(GBox, identity.scale(3, 3, 22), material1),
//       ...integers_map(6, (i) =>
//         polygons_transform(
//           cylinder(6),
//           identity
//             .translate(0, 0.6, i * 6 - 14)
//             .rotate(0, 0, 90)
//             .scale(2.5, 4, 1.5),
//           material1,
//         ),
//       ),
//     ]),
//   );

//   return csg_polygons(p);
// };

const weirdObject = () => {
  const material0 = material(1, 0.3, 0);
  const material1 = material(0, 0.5, 0.7);
  const material2 = material(0, 0.2, 0.9);
  const material3 = material(0.2, 0, 0.9);
  const material4 = material(0.4, 0.9, 0);
  const material5 = material(0.4, 0, 0.9);

  const figure0 = polygons_transform(cylinder(6), identity, material0);

  const figure01 = polygons_transform(cylinder(6), identity.scale(1, 0.6, 1).translate(0, 1, 0), material5);
  // const figure02 = solid_transform(solid_cylinder(material0, 6);

  const figure1 = polygons_transform(
    cylinder(118),
    identity.translate(-0.2).rotate(90, 10, 10).scale(0.5, 2, 0.5),
    material1,
  );

  const figure2 = polygons_transform(
    cylinder(118),
    identity.translate(-0.2).rotate(90, 10, 10).scale(0.22, 1.5, 0.22).skewY(10),
    material2,
  );

  const figure3 = polygons_transform(
    cylinder(18),
    identity.translate(-0.2).rotate(0, 10, 10).scale(0.3, 1.4, 0.3),
    material3,
  );

  const figure4 = polygons_transform(
    cylinder(8),
    identity.translate(-0.2).rotate(0, 0, 90).scale(0.15, 2, 0.15),
    material4,
  );

  const figure5 = polygons_transform(
    cylinder(5),
    identity.translate(-0.2).rotate(0, 10, 10).scale(0.15, 1.7, 0.15),
    material5,
  );

  if (DEBUG) {
    console.time("weird");
  }

  const csg0 = csg_subtract(csg_union([figure01, figure0]), figure1);
  const csg1 = csg_union([csg0, figure2]);
  const csg2 = csg_union([csg1, figure3]);
  const csg3 = csg_subtract(csg2, figure4);
  const csg4 = csg_subtract(csg3, figure5);

  const result = csg_polygons(csg4);

  if (DEBUG) {
    console.timeEnd("weird");
  }

  return result;
};
