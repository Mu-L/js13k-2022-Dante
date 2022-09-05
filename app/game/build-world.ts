import { identity } from "../math/matrix";
import { abs, clamp01, integers_map, lerpneg, max, min } from "../math/math";
import {
  material,
  GQuad,
  GBox,
  cylinder,
  polygons_transform,
  sphere,
  horn,
  polygon_transform,
} from "../geometry/geometry";
import { csg_subtract, csg_polygons, csg_union, csg_union_op } from "../geometry/csg";
import {
  boatLerp,
  levers,
  PLAYER_MODEL_ID,
  rotatingHexCorridorRotation,
  rotatingPlatform1Rotation,
  rotatingPlatform2Rotation,
} from "./world-state";
import { gameTime } from "../game-time";
import { meshAdd, meshEnd, withEditMatrix, newModel, type Model } from "./scene";
import { newLever } from "./levers";

export let playerRightLegModel: Model;

export let playerLeftLegModel: Model;

export let playerModel: Model;

export const buildWorld = () => {
  let _modelIdCounter = PLAYER_MODEL_ID + 1;

  // ========= entranceBarsMesh ========= //

  integers_map(7, (i) =>
    meshAdd(
      polygons_transform(
        cylinder(6, 1),
        identity.translate(4 * (i / 6 - 0.5), 3).scale(0.2, 3, 0.2),
        material(0.3, 0.3, 0.38),
      ),
    ),
  );
  const entranceBarsMesh = meshEnd();

  // ========= Player ========= //

  meshAdd(
    polygons_transform(cylinder(10, 1), identity.translate(-0.3, -1, 0).scale(0.2, 0.5, 0.24), material(1, 0.3, 0.4)),
  );
  const rightLegMesh = meshEnd();

  playerModel = newModel(() => {
    const rhorn = polygons_transform(
      horn(),
      identity.translate(0.2, 1.32, 0).rotate(0, 0, -30).scale(0.2, 0.6, 0.2),
      material(1, 1, 0.8),
    );

    meshAdd(rhorn);

    // left horn
    meshAdd(polygons_transform(rhorn, identity.rotate(0, 180)));

    // head
    meshAdd(polygons_transform(sphere(30), identity.translate(0, 1, 0).scale(0.5, 0.5, 0.5), material(1, 0.3, 0.4)));

    const eye = polygons_transform(
      csg_polygons(
        csg_subtract(cylinder(15, 1), polygons_transform(GBox, identity.translate(0, 0, 1).scale(2, 2, 0.5))),
      ),
      identity.rotate(-90, 0).scale(0.1, 0.05, 0.1),
      material(0.3, 0.3, 0.3),
    );

    [-1, 1].map((i) =>
      meshAdd(polygons_transform(eye, identity.translate(i * 0.2, 1.2, 0.4).rotate(0, i * 20, i * 20))),
    );

    // mouth
    meshAdd(
      polygons_transform(GBox, identity.translate(0, 0.9, 0.45).scale(0.15, 0.02, 0.06), material(0.3, 0.3, 0.3)),
    );

    // body
    meshAdd(polygons_transform(sphere(15), identity.scale(0.7, 0.8, 0.55), material(1, 0.3, 0.4)));

    // Player legs

    playerRightLegModel = newModel(() => rightLegMesh);
    playerLeftLegModel = withEditMatrix(identity.translate(0.6), () => newModel(() => rightLegMesh));
  }, PLAYER_MODEL_ID);

  newModel(() => {
    // gate columns

    polygon_transform(GQuad, identity.scale(3, 0, 15)).map(({ x, z }) => {
      meshAdd(
        polygons_transform(cylinder(6), identity.translate(x, 3, z).scale(0.7, 4, 0.7), material(0.6, 0.3, 0.3, 0.4)),
      );
    });

    //  gate top

    meshAdd(polygons_transform(GBox, identity.translate(0, 6.3, -15).scale(4, 0.3, 1), material(0.3, 0.3, 0.3, 0.4)));
    meshAdd(polygons_transform(GBox, identity.translate(0, 6.3, 15).scale(4, 0.3, 1), material(0.3, 0.3, 0.3, 0.4)));

    //  gate bottom

    meshAdd(polygons_transform(GBox, identity.translate(0, 1, -15).scale(3, 0.2, 0.35), material(0.5, 0.5, 0.5, 0.3)));
    meshAdd(polygons_transform(GBox, identity.translate(0, 1, 15).scale(3, 0.2, 0.35), material(0.5, 0.5, 0.5, 0.3)));

    // in and out gate bars

    [-15, 15].map((z, i) =>
      withEditMatrix(identity.translate(0, 0, z), () =>
        newModel((model) => {
          model._update = () => identity.translate(0, -levers[i]!.$lerpValue * 4.7);
          return entranceBarsMesh;
        }),
      ),
    );

    // horns

    integers_map(5, (i) =>
      integers_map(2, (j) => {
        meshAdd(
          polygons_transform(
            horn(),
            identity
              .translate((j - 0.5) * 18.5, 0, i * 4.8 - 9.5)
              .rotate(0, 180 - j * 180)
              .scale(1.2, 10, 1.2),
            material(1, 1, 0.8, 0.2),
          ),
        );
      }),
    );

    // in and out
    [-23, 22].map((z) => {
      meshAdd(polygons_transform(GBox, identity.translate(0, 0, z).scale(3, 1, 8), material(0.9, 0.9, 0.9, 0.2)));
    });

    meshAdd(polygons_transform(GBox, identity.translate(3, 1.5, -20).scale(0.5, 2, 5), material(0.7, 0.7, 0.7, 0.2)));

    // first lever pad
    meshAdd(
      polygons_transform(
        cylinder(5),
        identity.translate(-5.4, 0.3, -20).scale(3, 0.5, 3).rotate(0, -90),
        material(0.75, 0.75, 0.75, 0.2),
      ),
    );

    withEditMatrix(identity.translate(-5.4, 1.2, -20).rotate(0, -90), newLever);

    // descent

    meshAdd(
      polygons_transform(
        GBox,
        identity.rotate(0, 60, 0).translate(14.8, -1.46, -1).rotate(0, 0, -30).scale(4, 0.6, 4.5),
        material(0.8, 0.2, 0.2, 0.5),
      ),
    );

    // base

    meshAdd(
      csg_polygons(
        csg_subtract(
          csg_union([
            // lower base
            polygons_transform(
              cylinder(6, 0, 0, 0.3),
              identity.translate(8, -3, -4).scale(13, 1, 13),
              material(0.7, 0.7, 0.7, 0.2),
            ),

            // hole extension
            polygons_transform(cylinder(4), identity.translate(0, -10).scale(9, 9, 9), material(0.4, 0.2, 0.5, 0.5)),

            // middle base
            polygons_transform(
              cylinder(6, 0, 0, 0.3),
              identity.translate(0, -0.92).scale(13, 2, 13),
              material(0.8, 0.8, 0.8, 0.2),
            ),
          ]),
          csg_union([
            // hole
            polygons_transform(cylinder(5), identity.scale(5, 30, 5), material(0.4, 0.2, 0.6, 0.5)),

            // smooth hole
            polygons_transform(
              cylinder(5, 0, 1.5),
              identity.translate(0, 1, 0).scale(4.5, 0.3, 4.5),
              material(0.7, 0.5, 0.9, 0.2),
            ),

            // descent cut
            polygons_transform(
              GBox,
              identity.rotate(0, 60).translate(14, 0.7, -1).rotate(0, 0, -35).scale(2, 2, 2),
              material(0.5, 0.5, 0.5, 0.5),
            ),

            // lower lever pad
            polygons_transform(
              cylinder(6),
              identity.translate(15, -1.5, 4).scale(3.5, 1, 3.5),
              material(0.5, 0.5, 0.5, 0.5),
            ),
          ]),
        ),
      ),
    );

    // moving central platform

    newModel((model) => {
      // LEVER1
      withEditMatrix(identity.translate(0, 1.2), newLever);

      model._update = () => {
        model.$visible = levers[2]!.$lerpValue > 0;
        return identity.translate(
          0,
          (Math.cos(gameTime * 1.5) * 5 + 2) * levers[2]!.$lerpValue2 * (1 - levers[1]!.$lerpValue) +
            (1 - levers[2]!.$lerpValue2) * -15,
          0,
        );
      };
      meshAdd(
        polygons_transform(cylinder(5), identity.translate(0, -0.2).scale(5, 1, 5), material(0.6, 0.65, 0.7, 0.3)),
      );
    }, ++_modelIdCounter);

    // LEVER2
    withEditMatrix(identity.translate(15, -2, 4), newLever);

    // ******** LEVEL 2 ********

    withEditMatrix(identity.translate(0, 0, 75), () => {
      const getOscillationAmount = () => min(levers[1]!.$lerpValue2, 1 - levers[3]!.$lerpValue2);

      const blackPlatform = (oscillation: number, amplitude: number) =>
        // columns
        newModel((model) => {
          model._update = () =>
            identity.translate(getOscillationAmount() * Math.sin(oscillation + gameTime / 1.5) * amplitude);
          GQuad.map(({ x, z }) => {
            // column body
            meshAdd(
              polygons_transform(
                cylinder(11, 1),
                identity.translate(x * 4, 4, z * 4 - 40).scale(0.8, 3, 0.8),
                material(0.5, 0.3, 0.7, 0.6),
              ),
            );
            // column top
            meshAdd(
              polygons_transform(
                GBox,
                identity.translate(x * 4, 7, z * 4 - 40).scale(1, 0.3, 1),
                material(0.5, 0.5, 0.5, 0.3),
              ),
            );
          });

          meshAdd(
            csg_polygons(
              csg_subtract(
                polygons_transform(GBox, identity.translate(0, 0, -40).scale(5, 1, 5), material(0.8, 0.8, 0.8, 0.3)),
                csg_union(
                  [-1, 1].map((i) =>
                    polygons_transform(
                      GBox,
                      identity
                        .translate(5 * i, 0.2, -40)
                        .rotate(0, 0, i * -30)
                        .scale(4, 1, 2),
                      material(0.8, 0.8, 0.8, 0.3),
                    ),
                  ),
                ),
              ),
            ),
          );
          // bottom
          meshAdd(
            polygons_transform(GBox, identity.translate(0, -3, -40).scale(8, 2, 8), material(0.4, 0.4, 0.4, 0.3)),
          );
        }, ++_modelIdCounter);

      blackPlatform(0, 12);
      withEditMatrix(identity.translate(0, 0, 20), () => blackPlatform(5, 9.5));

      newModel((model) => {
        model._update = () => identity.translate(getOscillationAmount() * Math.sin(gameTime / 1.5 + 2) * 12, 0);
        meshAdd(
          csg_polygons(
            csg_subtract(
              csg_union_op(
                polygons_transform(GBox, identity.translate(0, 0, -30).scale(5, 1, 5), material(0.9, 0.9, 0.9, 0.2)),
                polygons_transform(GBox, identity.translate(0, -2, -30).scale(2, 3.2, 2), material(0.3, 0.8, 0.5, 0.5)),
              ),
              polygons_transform(GBox, identity.translate(0, 0, -30).scale(1.5, 10, 1.5), material(0.2, 0.7, 0.4, 0.6)),
            ),
          ),
        );
      }, ++_modelIdCounter);

      // ******** LEVEL 3 ********

      // triangle platform

      newModel((model) => {
        model._update = () => identity.translate((1 - getOscillationAmount()) * 9.5);
        meshAdd(
          polygons_transform(
            cylinder(3),
            identity.translate(-22.5, -1.5, -20).scale(5, 0.6, 9),
            material(0.3, 0.6, 0.6, 0.2),
          ),
        );

        meshAdd(
          polygons_transform(GBox, identity.translate(-22.5, -3, -20).scale(5, 1.7, 3.8), material(0.5, 0.5, 0.5, 0.3)),
        );

        // LEVER 3
        withEditMatrix(identity.translate(-22.5, -0.5, -14.5), newLever);
      }, ++_modelIdCounter);

      // fixed mini platform
      meshAdd(
        polygons_transform(GBox, identity.translate(-21, -3, -20).scale(3, 1.4, 3), material(0.9, 0.9, 0.9, 0.2)),
      );

      // oscillating mini platforms

      newModel((model) => {
        model._update = () =>
          identity.translate(
            0,
            0,
            clamp01(1 - getOscillationAmount() * 1.5) *
              lerpneg(levers[3]!.$lerpValue, levers[4]!.$lerpValue) *
              Math.sin(gameTime) *
              11,
          );
        meshAdd(
          polygons_transform(GBox, identity.translate(-27, -3, -20).scale(3, 1.4, 3), material(0.9, 0.9, 0.9, 0.2)),
        );

        meshAdd(
          polygons_transform(GBox, identity.translate(-39, -3, -20).scale(3, 1.4, 3), material(0.9, 0.9, 0.9, 0.2)),
        );
      }, ++_modelIdCounter);

      // fixed mini platform with hole

      meshAdd(
        polygons_transform(
          csg_polygons(
            csg_subtract(
              polygons_transform(GBox, identity.scale(3, 1.4, 3)),
              polygons_transform(GBox, identity.scale(1.2, 8, 1.2)),
            ),
          ),
          identity.translate(-33, -3, -20),
          material(0.9, 0.9, 0.9, 0.2),
        ),
      );

      // hex corridor door

      withEditMatrix(identity.translate(-44.5, 0, -20), () =>
        newModel((model) => {
          model._update = () => identity.translate(0, levers[3]!.$lerpValue2 * -6.5);
          meshAdd(
            polygons_transform(
              cylinder(6),
              identity.rotate(90, 90).rotate(0, 90).scale(5.9, 0.5, 5.9),
              material(0.7, 0.7, 0.7, 0.4),
            ),
          );
        }),
      );

      // hex corridor

      const hexCorridorPolygons = [
        ...polygons_transform(
          csg_polygons(
            csg_subtract(
              polygons_transform(cylinder(6), identity.rotate(0, 0, 90).scale(6, 8, 6)),
              csg_union([
                polygons_transform(
                  cylinder(4, 0, 0.01),
                  identity.translate(0, 6, 0).scale(12, 2, 0.75).rotate(0, 45),
                  material(1, 1, 1),
                ),
                polygons_transform(cylinder(6), identity.rotate(0, 0, 90).scale(5, 12, 5)),
                ...[5, 0, -5].map((x) =>
                  polygons_transform(cylinder(5), identity.translate(x, 2.5).rotate(90, 0, 36).scale(1.7, 10, 1.7)),
                ),
              ]),
            ),
          ),
          identity,
          material(0.3, 0.6, 0.6, 0.3),
        ),
        ...polygons_transform(GBox, identity.translate(0, -3, 0).scale(11, 1.4, 3), material(0.9, 0.9, 0.9, 0.2)),
      ];

      meshAdd(polygons_transform(hexCorridorPolygons, identity.translate(-53, 0, -20)));

      meshAdd(
        polygons_transform(
          cylinder(6),
          identity.translate(-61.3, -2.4, -26).scale(3, 1, 5),
          material(0.4, 0.6, 0.6, 0.3),
        ),
      );

      meshAdd(
        polygons_transform(
          cylinder(7),
          identity.translate(-57, -2.6, -29).scale(4, 1, 4),
          material(0.8, 0.8, 0.8, 0.3),
        ),
      );

      withEditMatrix(identity.translate(-55, -1.1, -29).rotate(0, 90), newLever);

      // rotating hex corridor

      withEditMatrix(identity.translate(-75, 0, -20), () =>
        newModel((model) => {
          model._update = () => {
            return identity
              .translate(0, (1 - levers[4]!.$lerpValue2) * (1 - levers[5]!.$lerpValue) * 3)
              .rotate(180 * (1 - levers[4]!.$lerpValue2) - rotatingHexCorridorRotation, 0);
          };
          meshAdd(hexCorridorPolygons);
        }),
      );

      // connection from rotating hex corridor to platforms

      meshAdd(
        polygons_transform(
          GBox,
          identity.translate(-88.3, -5.1, -20).rotate(0, 0, -30).scale(5, 1.25, 4.7),
          material(0.7, 0.7, 0.7, 0.2),
        ),
      );

      meshAdd(
        polygons_transform(
          cylinder(3, 0, -0.5),
          identity.translate(-88.4, -3.9, -20).rotate(0, -90, 17).scale(3, 1.45, 5.9),
          material(0.8, 0.8, 0.8, 0.2),
        ),
      );

      // platform after the rotating hex corridor

      meshAdd(
        polygons_transform(
          csg_polygons(
            csg_subtract(
              csg_union([
                // base
                polygons_transform(
                  GBox,
                  identity.translate(-100, -2.5, -20).scale(8, 1, 8),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
                // right path to the boat
                polygons_transform(
                  GBox,
                  identity.translate(-113, -2.6, -20).scale(6.2, 1.1, 3).skewX(3),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
                // straiht line
                polygons_transform(
                  GBox,
                  identity.translate(-100, -2.6, -5).scale(3, 1.1, 7),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
                // 45 degrees detour
                polygons_transform(
                  GBox,
                  identity.translate(-96, -2.6, -2).rotate(0, 45).scale(3, 1.1, 5),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
                // 45 degrees detour hexagon
                polygons_transform(
                  cylinder(6),
                  identity.translate(-88.79, -2.6, 5.21).scale(6, 1.1, 6).rotate(0, 15),
                  material(0.6, 0.6, 0.6, 0.3),
                ),

                // ascension
                polygons_transform(
                  GBox,
                  identity.translate(-100, -1.1, 7.39).rotate(-15, 0).scale(3, 1.1, 6),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
                // ascension continuation
                polygons_transform(
                  GBox,
                  identity.translate(-100, 0.42, 17).scale(3, 1.1, 4.1),
                  material(0.8, 0.8, 0.8, 0.2),
                ),
              ]),

              csg_union([
                // decorative octagon
                polygons_transform(
                  cylinder(8),
                  identity.translate(-100, -1, -20).scale(7, 0.9, 7),
                  material(0.3, 0.3, 0.3, 0.4),
                ),
                polygons_transform(
                  cylinder(8),
                  identity.translate(-100, -2, -20).scale(4, 0.3, 4),
                  material(0.4, 0.4, 0.4, 0.5),
                ),
                polygons_transform(
                  cylinder(8),
                  identity.translate(-100, -3, -20).scale(0.6, 1, 0.6),
                  material(0.4, 0.4, 0.4, 0.5),
                ),
              ]),
            ),
          ),
          identity,
        ),
      );

      // first arc door

      meshAdd(
        csg_polygons(
          csg_subtract(
            polygons_transform(GBox, identity.translate(-100, 1, -12).scale(7.5, 4, 1), material(0.5, 0.5, 0.5, 0.4)),
            csg_union([
              polygons_transform(
                GBox,
                identity.translate(-100, 0.1, -5).scale(2, 1.7, 10),
                material(0.5, 0.5, 0.5, 0.4),
              ),
              polygons_transform(
                cylinder(25, 1),
                identity.translate(-100, 2, -5).scale(2, 2, 10).rotate(90, 0),
                material(0.5, 0.5, 0.5, 0.4),
              ),
            ]),
          ),
        ),
      );

      // gate bars

      withEditMatrix(identity.translate(-99.7, -2, -11.5), () =>
        newModel((model) => {
          model._update = () => identity.translate(0, -levers[5]!.$lerpValue * 5.3);

          return entranceBarsMesh;
        }),
      );

      // hex columns

      GQuad.map(({ x, z }) => {
        meshAdd(
          polygons_transform(
            cylinder(6),
            identity.translate(-100 + x * 7, -3, z * 7 - 20).scale(1, 8.1, 1),
            material(0.6, 0.15, 0.15, 0.8),
          ),
        );
        [4, -0.4].map((i) =>
          meshAdd(
            polygons_transform(
              cylinder(6),
              identity.translate(-100 + x * 7, i, z * 7 - 20).scale(1.3, 0.5, 1.3),
              material(0.4, 0.2, 0.2, 0.8),
            ),
          ),
        );
      });

      // crystals

      [
        material(0.5, 0.5, 0.6, 0.25),
        material(0.4, 0.4, 0.6, 0.35),
        material(0.35, 0.5, 0.6, 0.45),
        material(0.3, 0.6, 0.6, 0.25),
        material(0.25, 0.5, 0.6, 0.35),
        material(0.2, 0.4, 0.6, 0.25),
        material(0.15, 0.5, 0.6, 0.35),
      ].map((m, i) => {
        meshAdd(
          polygons_transform(
            cylinder(((i * 23 + 1) % 5) + 5, 0, 0.55),
            identity
              .translate(-101 + Math.sin(i) * 5 + i, -2.3 - i, -30.1 - i * 2.8)
              .scaleSelf(5 + i / 2, 1 + i / 6, 5 + i / 3),
            m,
          ),
        );
      });

      // crystals continuation pad

      meshAdd(
        polygons_transform(GBox, identity.translate(-87, -9.5, -51).scale(7, 1, 3), material(0.4, 0.5, 0.6, 0.4)),
      );

      // lever pad

      meshAdd(
        polygons_transform(
          cylinder(4),
          identity.translate(-86, -9.2, -48).scale(5, 1, 5),
          material(0.5, 0.6, 0.7, 0.3),
        ),
      );

      meshAdd(
        polygons_transform(
          cylinder(25, 1),
          identity.translate(-86, -9, -44).scale(1.5, 1, 1.5),
          material(0.3, 0.3, 0.4, 0.1),
        ),
      );

      // LEVER6
      withEditMatrix(identity.translate(-86, -7.5, -44), newLever);

      // elevators

      withEditMatrix(identity.translate(-76.9, -10, -51), () => {
        const shouldOscillate = () => lerpneg(levers[6]!.$lerpValue2, levers[5]!.$lerpValue2);

        newModel((model) => {
          model._update = () =>
            identity.translate(
              0,
              (1 - max(levers[5]!.$lerpValue, levers[6]!.$lerpValue)) * 3.5 +
                shouldOscillate() * Math.sin(gameTime) * 7,
            );
          [0, 12].map((x) =>
            meshAdd(
              polygons_transform(GBox, identity.translate(x, x / -13).scale(2.8, 1.5, 3), material(0.2, 0.5, 0.6, 0.2)),
            ),
          );
        }, ++_modelIdCounter);
        newModel((model) => {
          model._update = () => identity.translate(0, shouldOscillate() * Math.sin(gameTime + 3) * 6);
          [6, 18].map((x) =>
            meshAdd(
              polygons_transform(GBox, identity.translate(x, x / -13).scale(2.8, 1.5, 3), material(0.1, 0.4, 0.5, 0.2)),
            ),
          );
        }, ++_modelIdCounter);
      });

      // pad after elevators

      withEditMatrix(identity.translate(-44.9, -11.3, -51), () => {
        meshAdd(
          csg_polygons(
            csg_subtract(
              csg_union_op(
                polygons_transform(GBox, identity.scale(11, 1, 8), material(0.3, 0.4, 0.6, 0.3)),
                polygons_transform(cylinder(5), identity.scale(7, 1.2, 7), material(0, 0.2, 0.3, 0.5)),
              ),
              polygons_transform(cylinder(5), identity.scale(4.4, 5, 4.4), material(0, 0.2, 0.3, 0.5)),
            ),
          ),
        );

        // central sculpture/monument

        newModel((model) => {
          model._update = () => identity.translate(0, levers[6]!.$lerpValue2 * -5.9);

          meshAdd(
            csg_polygons(
              csg_subtract(
                csg_union([
                  polygons_transform(
                    cylinder(5),
                    identity.translate(0, 2).scale(4, 6, 4).skewY(8),
                    material(0.2, 0.4, 0.5, 0.5),
                  ),
                  polygons_transform(
                    cylinder(5),
                    identity.translate(0, 5).scale(2, 6, 2).skewY(-8),
                    material(0.25, 0.35, 0.5, 0.5),
                  ),
                  polygons_transform(
                    cylinder(5),
                    identity.translate(0, 9).scale(1.2, 5, 1.2).skewY(8),
                    material(0.35, 0.3, 0.5, 0.5),
                  ),
                ]),
                polygons_transform(
                  cylinder(5),
                  identity.translate(0, 5).scale(1.5, 1.5, 8).rotate(90, 0, 35),
                  material(0.2, 0.4, 0.5, 0.5),
                ),
              ),
            ),
          );
        });

        // columns

        GQuad.map(({ x, z }) => {
          meshAdd(
            polygons_transform(
              cylinder(20, 1),
              identity.translate(x * 9, 4, z * 6).scale(1, 4, 1),
              material(0.25, 0.25, 0.25, 1),
            ),
          );
          [1.5, 8].map((y) =>
            meshAdd(
              polygons_transform(
                cylinder(20, 1),
                identity.translate(x * 9, y, z * 6).scale(1.5, 0.5, 1.5),
                material(0.6, 0.6, 0.6, 0.3),
              ),
            ),
          );
        });

        // lever pad

        meshAdd(polygons_transform(GBox, identity.translate(0, 0, -9).scale(3, 1.2, 3), material(0.35, 0.3, 0.5, 0.5)));

        withEditMatrix(identity.translate(0, 1.7, -11).rotate(0, 180), newLever);
      });

      // Detour lever pad
      meshAdd(
        polygons_transform(
          cylinder(5),
          identity.translate(-84, -2, 10).scale(4, 0.8, 4).rotate(0, 10, 0),
          material(0.8, 0.1, 0.25, 0.4),
        ),
      );

      // Detour lever
      withEditMatrix(identity.translate(-84, -0.5, 10).rotate(0, 45), newLever);
    });

    // ******** BOAT ********

    withEditMatrix(identity.translate(-123, 1.4, 55), () => {
      newModel((model) => {
        model._update = () => {
          return identity
            .translate(Math.sin(gameTime + 2) / 5, Math.sin(gameTime * 0.8) / 3, boatLerp * -60)
            .rotate(Math.sin(gameTime) * 2, Math.sin(gameTime * 0.7), Math.sin(gameTime * 0.9));
        };
        meshAdd(
          csg_polygons(
            csg_subtract(
              polygons_transform(
                cylinder(20, 1, 1.15, 1),
                identity.translate(0, -3).scale(3.5, 1, 3.5),
                material(0.7, 0.4, 0.25, 0.7),
              ),
              csg_union_op(
                polygons_transform(
                  cylinder(20, 1, 1.3, 1),
                  identity.translate(0, -2.5).scale(2.6, 1, 3),
                  material(0.7, 0.4, 0.25, 0.2),
                ),
                polygons_transform(GBox, identity.translate(4, -1.2, 0).scale3d(2), material(0.7, 0.4, 0.25, 0.3)),
              ),
            ),
          ),
        );

        withEditMatrix(identity.translate(0, -3, -4).rotate(0, 180), newLever);
      }, ++_modelIdCounter);
    });

    // ******** LEVEL AFTER BOAT ********

    const bigArc = csg_polygons(
      csg_subtract(
        polygons_transform(GBox, identity.translate(0, -8).scale(6, 15, 2.2)),
        csg_union_op(
          polygons_transform(GBox, identity.translate(0, -14.1, 0).scale(4, 13, 4)),
          polygons_transform(cylinder(30, 1), identity.translate(0, -1).rotate(90, 0, 90).scale3d(4)),
        ),
      ),
    );

    withEditMatrix(identity.translate(-123, 0, -5), () => {
      const pushingRod = csg_polygons(
        csg_subtract(
          polygons_transform(
            GBox,
            identity.translate(0, -0.5, 1).scale(1.15, 1.2, 6.5),
            material(0.25, 0.25, 0.35, 0.3),
          ),
          csg_union([
            polygons_transform(
              cylinder(3),
              identity.translate(0, 0, -5.5).scale(3, 2, 1),
              material(0.6, 0.3, 0.4, 0.3),
            ),
            ...[-1.2, 1.2].map((i) =>
              polygons_transform(
                GBox,
                identity.translate(i, -0.5, 1).scale(0.14, 0.3, 6.5),
                material(0.7, 0.2, 0, 0.3),
              ),
            ),
          ]),
        ),
      );

      // boat attachment

      meshAdd(
        polygons_transform(GBox, identity.translate(7, -2.6).scale(3.2, 1.1, 3).skewX(3), material(0.8, 0.8, 0.8, 0.2)),
      );

      meshAdd(
        polygons_transform(
          cylinder(6),
          identity.translate(7, -2.6, -4.5).scale(3.2, 0.8, 3),
          material(0.6, 0.5, 0.7, 0.2),
        ),
      );

      withEditMatrix(identity.translate(7, -1.4, -6), newLever);

      // arcs

      integers_map(3, (i) =>
        meshAdd(polygons_transform(bigArc, identity.translate(i * 12 + 14, -9), material(0.6, 0.6, 0.6, 0.3))),
      );

      integers_map(3, (i) =>
        meshAdd(
          polygons_transform(
            bigArc,
            identity.translate(46, -9, i * -12 - 8).rotate(0, 90),
            material(0.6, 0.6, 0.6, 0.3),
          ),
        ),
      );

      meshAdd(
        polygons_transform(cylinder(8), identity.translate(46, -16.9).scale(4, 15.2, 4), material(0.6, 0.6, 0.6, 0.2)),
      );

      meshAdd(polygons_transform(GBox, identity.translate(7.5, -17).scale(0.5, 15, 2.2), material(0.6, 0.6, 0.6, 0.3)));

      meshAdd(
        polygons_transform(GBox, identity.translate(46, -17, -38.5).scale(2.2, 15, 0.5), material(0.6, 0.6, 0.6, 0.3)),
      );

      // pushing rods container

      meshAdd(
        polygons_transform(
          csg_polygons(
            csg_subtract(
              csg_union_op(
                polygons_transform(GBox, identity.translate(26.5, -1.6, 10).scale(17, 2.08, 3)),
                polygons_transform(GBox, identity.translate(26.5, -0.6, 10).scale(17, 2, 0.5)),
              ),
              csg_union([
                ...integers_map(4, (x) =>
                  polygons_transform(GBox, identity.translate(13 + x * 9, -0.8, 9).scale(1.35, 1.35, 9)),
                ),
                ...integers_map(3, (x) =>
                  polygons_transform(GBox, identity.translate(17 + x * 9, -0.8, 9).scale(1.35, 1.35, 9)),
                ),
              ]),
            ),
          ),
          identity,
          material(0.5, 0.5, 0.6, 0.2),
        ),
      );

      meshAdd(
        polygons_transform(
          cylinder(5),
          identity.translate(9.4, -1.6, 10).rotate(0, 90, 90).scale(1.5, 0.2, 1.5),
          material(0.25, 0.25, 0.35, 1),
        ),
      );

      // pushing rods

      const shouldPushRods = () => lerpneg(levers[9]!.$lerpValue, levers[10]!.$lerpValue);
      const shouldBlockRods = () => (1 - levers[9]!.$lerpValue) * (1 - shouldPushRods());

      newModel((model) => {
        model._update = () => identity.translate(0, -2, shouldPushRods() * abs(Math.sin(gameTime * 1.2)) * -8.5 + 10);
        integers_map(4, (x) => meshAdd(polygons_transform(pushingRod, identity.translate(13 + x * 9, 1.7))));
      });

      newModel((model) => {
        model._update = () =>
          identity.translate(0, -2, max(shouldBlockRods(), shouldPushRods() * abs(Math.sin(gameTime + 1))) * -8.5 + 10);
        integers_map(3, (x) => meshAdd(polygons_transform(pushingRod, identity.translate(17 + x * 9, 1.7))));
      });

      // internal pad

      meshAdd(
        polygons_transform(
          GBox,
          identity.translate(38.1, -4.3, -28).rotate(0, 0, 12).scale(6, 1, 3),
          material(0.6, 0.6, 0.6, 0.3),
        ),
      );

      meshAdd(
        csg_polygons(
          csg_subtract(
            polygons_transform(GBox, identity.translate(30, -5.8, -28).scale(9, 1, 5), material(0.8, 0.8, 0.8, 0.1)),
            polygons_transform(
              cylinder(9),
              identity.translate(25, -5.8, -28).scale(3, 8, 3),
              material(0.7, 0.7, 0.7, 0.2),
            ),
          ),
        ),
      );

      meshAdd(
        polygons_transform(
          cylinder(9),
          identity.translate(25, -5.8, -28).scale(2.5, 0.9, 2.5),
          material(0.5, 0.5, 0.5, 0.3),
        ),
      );

      withEditMatrix(identity.translate(25, -4.4, -28).rotate(0, 90), newLever);
    });

    // ******** LEVEL AFTER CENTRAL GATE ********

    withEditMatrix(identity.translate(-100, 0.7, 115), () => {
      // base

      meshAdd(
        csg_polygons(
          csg_subtract(
            csg_union_op(
              polygons_transform(
                cylinder(6, 0, 0, 0.6),
                identity.translate(0, 0, -9.5).scale(8, 1, 11),
                material(0.7, 0.7, 0.7, 0.2),
              ),
              polygons_transform(
                GBox,
                identity.translate(-1.5, 0, -21.5).scale(10.5, 1, 2),
                material(0.7, 0.7, 0.7, 0.2),
              ),
            ),
            polygons_transform(cylinder(5), identity.translate(0, 0, -2).scale(4, 3, 4), material(0.7, 0.7, 0.7, 0.2)),
          ),
        ),
      );

      // up and down hex pads

      const hexPadShouldOscillate = () => lerpneg(levers[7]!.$lerpValue2, levers[11]!.$lerpValue2);

      [
        material(0.5, 0.5, 0.6, 0.25),
        material(0.4, 0.4, 0.6, 0.35),
        material(0.35, 0.5, 0.6, 0.45),
        material(0.3, 0.6, 0.6, 0.25),
      ].map((m, i) => {
        newModel((model) => {
          model._update = () =>
            identity.translate(
              i > 2 ? (1 - hexPadShouldOscillate()) * 2 : 0,
              hexPadShouldOscillate() * Math.sin(gameTime + i * 1.7) * (5 + i / 4),
              (i & 1 ? -1 : 1) * (1 - levers[7]!.$lerpValue2) * (1 - levers[11]!.$lerpValue2) * -7,
            );
          meshAdd(
            polygons_transform(
              cylinder(6),
              identity.translate(-14.6 - i * 5.2 - (i > 2 ? 2 : 0), -i / 2.3, -21.5).scale(3, 1, 3),
              m,
            ),
          );
        }, ++_modelIdCounter);
      });

      // after the hex pads

      withEditMatrix(identity.translate(-42, -2.5, -21.5), () => {
        // pad with hole
        newModel((model) => {
          model._update = () =>
            identity.translate((1 - hexPadShouldOscillate()) * 3.5, (1 - levers[7]!.$lerpValue) * -4);
          meshAdd(
            csg_polygons(
              csg_subtract(
                polygons_transform(cylinder(10), identity.scale(6, 2, 6), material(0.1, 0.6, 0.5, 0.3)),
                polygons_transform(cylinder(10), identity.scale(2.7, 6, 2.7), material(0.1, 0.6, 0.5, 0.5)),
              ),
            ),
          );

          // second pad
          withEditMatrix(identity.translate(-7.5).rotate(0, 90), () => {
            meshAdd(polygons_transform(cylinder(15), identity.scale(3, 2.3, 3), material(0.4, 0.4, 0.4, 0.3)));
            meshAdd(polygons_transform(cylinder(10), identity.scale(2, 2.5, 2), material(0.3, 0.8, 0.7, 0.3)));
            meshAdd(polygons_transform(cylinder(5), identity.scale(1, 3, 1), material(0.5, 0.5, 0.5, 0.5)));

            withEditMatrix(identity.translate(0, 3.4).rotate(0, 180), newLever);
          });

          // lateral horns
          [-1, 1].map((i) =>
            meshAdd(
              polygons_transform(
                horn(),
                identity
                  .rotate(-i * 90, 180, 90) //
                  .translate(0, 5, 0)
                  .rotate(0, 0, 40) //
                  .scale(1.3, 10, 1.3), //
                material(1, 1, 0.8, 0.2),
              ),
            ),
          );
        }, ++_modelIdCounter);
      });

      // far arc gate
      [-1, 1].map((x) => {
        meshAdd(
          polygons_transform(
            cylinder(15, 1),
            identity.translate(-7.5 * x, 3, -19).scale(0.8, 4, 0.8),
            material(0.6, 0.24, 0.2, 0.5),
          ),
        );

        [7.2, 1.5].map((y) =>
          meshAdd(
            polygons_transform(
              cylinder(15, 1),
              identity.translate(-7.5 * x, y, -19).scale(1.1, 0.5, 1.1),
              material(0.5, 0.24, 0.2, 0.4),
            ),
          ),
        );

        meshAdd(
          polygons_transform(
            horn(),
            identity
              .translate(x * -5, 1, -0.5)
              .scale(1.2, 10, 1.2)
              .rotate(0, 90 * x - 90),
            material(1, 1, 0.8),
          ),
        );

        meshAdd(
          polygons_transform(
            csg_polygons(
              csg_subtract(
                csg_union_op(
                  polygons_transform(
                    GBox,
                    identity.translate(8.8, 0, 9).scale(3, 1, 3.3),
                    material(0.7, 0.7, 0.7, 0.2),
                  ),
                  polygons_transform(
                    GBox,
                    identity.translate(x * -4, 3.5, -0.5).scale(4, 4, 0.7),
                    material(0.5, 0.5, 0.5, 0.4),
                  ),
                ),
                csg_union([
                  polygons_transform(GBox, identity.scale(3, 3, 10), material(0.6, 0.24, 0.2, 0.5)),
                  polygons_transform(
                    cylinder(40, 1),
                    identity.translate(0, 3, -5).scale(3, 4, 10).rotate(90, 0),
                    material(0.6, 0.24, 0.2, 0.5),
                  ),
                  polygons_transform(
                    cylinder(5),
                    identity
                      .translate(x * -5.3, 7, 0)
                      .rotate(90, 0)
                      .scale(1.7, 5, 1.7),
                    material(0.6, 0.24, 0.2, 0.5),
                  ),
                  polygons_transform(
                    cylinder(5),
                    identity
                      .translate(x * -5.3, 3.8, 0)
                      .rotate(90, 0, 35)
                      .scale(0.75, 5, 0.75),
                    material(0.6, 0.24, 0.2, 0.5),
                  ),
                ]),
              ),
            ),
            identity.translate(x, 0, -18),
          ),
        );
      });

      // far arc gate door

      withEditMatrix(identity.translate(0, 0, 0), () =>
        newModel((model) => {
          model._update = () => identity.translate(0, -0.1 - levers[11]!.$lerpValue * 6, -18.5).scale(0.88, 1.2, 1);
          return entranceBarsMesh;
        }),
      );

      // the left bridge after the far arc gate

      const rotPlatformBase = [
        ...polygons_transform(cylinder(30, 1), identity.scale(8, 1, 8), material(0.45, 0.45, 0.45, 0.2)),
        ...polygons_transform(cylinder(5), identity.translate(0, 1).scale(1, 0.2, 1), material(0.3, 0.3, 0.3, 0.2)),
      ];

      // rotating platforms

      const rotPlatform = () => {
        meshAdd(
          csg_polygons(
            csg_subtract(
              polygons_transform(cylinder(30, 1), identity.translate(0, 2).scale(8, 1, 8), material(0.35, 0, 0, 0.3)),
              polygons_transform(GBox, identity.scale(9, 5, 2), material(0.3, 0, 0, 0.3)),
            ),
          ),
        );
        meshAdd(rotPlatformBase);
      };

      withEditMatrix(identity.translate(20, 0.3, -9), () => {
        meshAdd(polygons_transform(GBox, identity.translate(8, 0).scale(0.7, 0.8, 2.5), material(0.7, 0.7, 0.7, 0.2)));
        newModel((model) => {
          model._update = () => identity.rotate(0, 180 + rotatingPlatform1Rotation);
          meshAdd(
            csg_polygons(
              csg_subtract(
                polygons_transform(cylinder(30, 1), identity.scale(8, 1, 8), material(0.45, 0.45, 0.45, 0.2)),
                polygons_transform(
                  cylinder(8),
                  identity.translate(5.5).scale(1.7, 3, 1.7),
                  material(0.45, 0.45, 0.45, 0.2),
                ),
              ),
            ),
          );
          meshAdd(
            polygons_transform(cylinder(8), identity.translate(0, 2).scale(3, 1.5, 3), material(0.7, 0.7, 0.7, 0.1)),
          );
          meshAdd(
            polygons_transform(cylinder(5), identity.translate(0, 2).scale(1, 2, 1), material(0.3, 0.3, 0.3, 0.2)),
          );
        }, ++_modelIdCounter);
      });

      withEditMatrix(identity.translate(36, 0.3, -9), () => {
        meshAdd(polygons_transform(GBox, identity.translate(8, 0).scale(0.7, 0.8, 2.5), material(0.7, 0.7, 0.7, 0.2)));
        newModel((model) => {
          model._update = () => identity.rotate(0, rotatingPlatform2Rotation);
          rotPlatform();
          [-1, 1].map((x) =>
            meshAdd(
              polygons_transform(
                horn(),
                identity
                  .rotate(0, 90)
                  .translate(x * -5, 1, -0.5)
                  .scale(1.2, 10, 1.2)
                  .rotate(0, 90 * x + 90),
                material(1, 1, 0.8),
              ),
            ),
          );
        }, ++_modelIdCounter);
      });

      withEditMatrix(identity.translate(52, 0.3, -9), () => {
        meshAdd(
          polygons_transform(GBox, identity.translate(0, 0, -8).scale(2.5, 0.8, 0.7), material(0.7, 0.7, 0.7, 0.2)),
        );
        newModel((model) => {
          model._update = () => identity.rotate(0, 180 - rotatingPlatform2Rotation);
          meshAdd(
            csg_polygons(
              csg_subtract(
                polygons_transform(cylinder(30, 1), identity.translate(0, 2).scale(8, 1, 8), material(0.35, 0, 0, 0.3)),
                csg_union([
                  polygons_transform(GBox, identity.translate(7).scale(9, 5, 2), material(0.3, 0, 0, 0.3)),
                  polygons_transform(GBox, identity.translate(0, 0, 7).scale(2, 5, 9), material(0.3, 0, 0, 0.3)),
                ]),
              ),
            ),
          );
          meshAdd(rotPlatformBase);
        }, ++_modelIdCounter);
      });

      withEditMatrix(identity.translate(52, 0.3, -25), () => {
        newModel((model) => {
          model._update = () => identity.rotate(0, 270 + rotatingPlatform2Rotation);
          meshAdd(
            csg_polygons(
              csg_subtract(
                polygons_transform(cylinder(30, 1), identity.translate(0, 2).scale(8, 1, 8), material(0.35, 0, 0, 0.3)),
                csg_union([
                  polygons_transform(GBox, identity.translate(7).scale(9, 5, 2), material(0.3, 0, 0, 0.3)),
                  polygons_transform(GBox, identity.translate(0, 0, -7).scale(2, 5, 9), material(0.3, 0, 0, 0.3)),
                ]),
              ),
            ),
          );
          meshAdd(rotPlatformBase);
        }, ++_modelIdCounter);
      });

      // exit from the rotating platforms
      meshAdd(polygons_transform(GBox, identity.translate(61, -0.3, -25).scale(2, 1, 2), material(0.7, 0.7, 0.7, 0.3)));
      meshAdd(polygons_transform(GBox, identity.translate(68, -0.3, -25).scale(5, 1, 3), material(0.7, 0.7, 0.7, 0.3)));

      withEditMatrix(identity.translate(66, 2, -19).rotate(-12, 0), () => {
        newLever();
      });

      meshAdd(
        polygons_transform(
          cylinder(5),
          identity.translate(66, -0.5, -19).scale(3, 2, 4).rotate(-20, 0),
          material(0.2, 0.5, 0.5, 0.6),
        ),
      );

      // ******** LEVEL AFTER THE ROTATING PLATFORMS ********

      // jumping pads

      [material(0.1, 0.55, 0.45, 0.2), material(0.2, 0.5, 0.5, 0.3), material(0.3, 0.45, 0.55, 0.4)].map((m, i) =>
        newModel((model) => {
          model._update = () =>
            identity.translate(
              0,
              (1 - levers[12]!.$lerpValue2) * (1 - levers[13]!.$lerpValue2) * 3 +
                lerpneg(levers[12]!.$lerpValue2, levers[13]!.$lerpValue2) * Math.sin(gameTime * 1.5 + i * 1.5) * 4,
            );
          meshAdd(
            polygons_transform(
              GBox,
              identity.translate(76.5, -2.1 + i / 2, -25 + 7.5 * (1 - i / 30) * i).scale(3.3, 3 - i / 2, 3.45 - i / 5),
              m,
            ),
          );
        }),
      );

      withEditMatrix(identity.translate(100, 0.2, -20), () => {
        // connection
        meshAdd(
          polygons_transform(GBox, identity.translate(-9.7, -0.2, 8.9).scale(10, 1, 2.5), material(0.6, 0.6, 0.6, 0.2)),
        );

        // middle base
        meshAdd(
          csg_polygons(
            csg_subtract(
              polygons_transform(
                cylinder(6, 0, 0, 0.3),
                identity.translate(0, -0.92).scale(14, 2, 14),
                material(0.8, 0.8, 0.8, 0.2),
              ),
              polygons_transform(cylinder(5), identity.scale3d(5), material(0.3, 0.3, 0.3, 0.5)),
            ),
          ),
        );

        [8, -11].map((y, p) =>
          integers_map(3, (i) =>
            meshAdd(
              polygons_transform(
                bigArc,
                identity.translate(i * 6 - 6, y - (i & 1), 14.5 - 0.2 * (i & 1) + p),
                i & 1 ? material(0.5, 0.5, 0.5, 0.3) : material(0.35, 0.35, 0.35, 0.5),
              ),
            ),
          ),
        );

        // horns
        [-1, 1].map((x) =>
          meshAdd(
            polygons_transform(
              horn(),
              identity
                .translate(x * -8, 1, -10)
                .scale(1.2, 10, 1.2)
                .rotate(0, 90 * x + 90),
              material(1, 1, 0.8),
            ),
          ),
        );

        // lever pad

        meshAdd(
          polygons_transform(
            cylinder(5),
            identity.translate(0, 1, -13).scale(3, 0.3, 3).rotate(0, 35),
            material(0.6, 0, 0, 0.4),
          ),
        );

        // LEVER13
        withEditMatrix(identity.translate(0, 1.7, -13).rotate(0, 180), newLever);

        newModel((model) => {
          model._update = () => identity.translate(0, lerpneg(levers[13]!.$lerpValue, levers[12]!.$lerpValue2) * 15);
          meshAdd(polygons_transform(cylinder(5), identity.scale(4, 1.1, 4), material(0.5, 0.3, 0.3, 0.4)));
          meshAdd(polygons_transform(cylinder(5), identity.scale(4.5, 0.9, 4.5), material(0.3, 0.3, 0.3, 0.4)));
          meshAdd(
            polygons_transform(
              cylinder(5),
              identity.translate(0, -10).scale(0.5, 10, 0.5),
              material(0.3, 0.3, 0.3, 0.4),
            ),
          );
        }, ++_modelIdCounter);
      });
    });
  });

  if (DEBUG) {
    console.log(levers.length + " levers");
  }
};

NO_INLINE(buildWorld);