import { clamp, max, abs, lerpneg, min, angle_wrap_degrees, lerp } from "../math/math";
import {
  allModels,
  levers,
  LEVERS_COUNT,
  MODELS_WITH_FULL_TRANSFORM,
  MODELS_WITH_SIMPLE_TRANSFORM,
  souls,
  SOULS_COUNT,
} from "./models";
import { transformsBuffer } from "./transforms-buffer";
import { matrixToArray, tempMatrix } from "../math/matrix";
import { gameTime, gameTimeDelta, lerpDamp } from "./game-time";
import { firstBoatLerp, secondBoatLerp } from "./world-state";
import { player_update } from "./player";
import { modelsNextUpdate, modelsResetUpdateCounter, verifyModelsNextUpdate } from "./models-next-update";
import {
  LEVER_ID_GATE0,
  LEVER_ID_GATE1,
  LEVER_ID_LEVEL1_DESCENT,
  LEVER_ID_TRIANGLE_PLATFORM,
  LEVER_ID_ROTATING_CORRIDOR,
  LEVER_ID_CRYSTALS,
  LEVER_ID_MONUMENT,
  LEVER_ID_DETOUR,
  LEVER_ID_BEFORE_PUSHING_RODS,
  LEVER_ID_AFTER_PUSHING_RODS,
  LEVER_ID_DONUT_PAD,
  LEVER_ID_AFTER_ROTATING_PLATFORMS,
  LEVER_ID_AFTER_JUMPING_PADS,
  LEVER_ID_FLOATING_ELEVATOR,
} from "./levers-ids";
import {
  MODEL_ID_BOAT0,
  MODEL_ID_BOAT1,
  MODEL_ID_DONUT_PAD,
  MODEL_ID_ELEVATORS0,
  MODEL_ID_ELEVATORS1,
  MODEL_ID_FLOATING_ELEVATOR_PAD,
  MODEL_ID_GATE0,
  MODEL_ID_GATE1,
  MODEL_ID_GATE2,
  MODEL_ID_GATE3,
  MODEL_ID_JUMPING_PAD0,
  MODEL_ID_LEVEL1_CENTRAL_PLATFORM,
  MODEL_ID_LEVEL2_BLACK_PLATFORM0,
  MODEL_ID_LEVEL2_BLACK_PLATFORM1,
  MODEL_ID_LEVEL2_CENTRAL_PLATFORM,
  MODEL_ID_LEVEL2_HEX_CORRIDOR_DOOR,
  MODEL_ID_LEVEL2_MINI_PLATFORM_HORIZONTAL,
  MODEL_ID_LEVEL2_MINI_PLATFORM_VERTICAL,
  MODEL_ID_LEVEL2_ROTATING_HEX_CORRIDOR,
  MODEL_ID_MONUMENT,
  MODEL_ID_OSCILLATING_HEX_PAD0,
  MODEL_ID_PENDULUMS,
  MODEL_ID_PUSHING_ROD0,
  MODEL_ID_PUSHING_ROD1,
  MODEL_ID_PUSHING_ROD2,
  MODEL_ID_ROTATING_PLATFORM0,
  MODEL_ID_ROTATING_PLATFORM1,
  MODEL_ID_ROTATING_PLATFORM2,
  MODEL_ID_ROTATING_PLATFORM3,
  MODEL_ID_TRIANGLE_PLATFORM,
} from "./models-ids";

export let shouldRotatePlatforms: number;

let rotatingPlatform1Rotation: number;

let rotatingPlatform2Rotation: number;

let rotatingHexCorridorRotation: number;

export const eppur_si_muove = () => {
  modelsResetUpdateCounter();

  shouldRotatePlatforms = lerpneg(
    levers[LEVER_ID_DONUT_PAD]!.$lerpValue,
    levers[LEVER_ID_AFTER_ROTATING_PLATFORMS]!.$lerpValue,
  );

  rotatingHexCorridorRotation = lerp(
    lerpDamp(rotatingHexCorridorRotation, 0, 1),
    angle_wrap_degrees(rotatingHexCorridorRotation + gameTimeDelta * 60),
    levers[LEVER_ID_ROTATING_CORRIDOR]!.$lerpValue - levers[LEVER_ID_CRYSTALS]!.$lerpValue2,
  );

  rotatingPlatform1Rotation = lerp(
    lerpDamp(rotatingPlatform1Rotation, 0, 5),
    angle_wrap_degrees(rotatingPlatform1Rotation + gameTimeDelta * 56),
    shouldRotatePlatforms,
  );

  rotatingPlatform2Rotation = lerp(
    lerpDamp(rotatingPlatform2Rotation, 0, 4),
    angle_wrap_degrees(rotatingPlatform2Rotation + gameTimeDelta * 48),
    shouldRotatePlatforms,
  );

  /// ****** TRANSLATIONS ONLY ****** ///

  // moving central platform in the first level

  verifyModelsNextUpdate(MODEL_ID_LEVEL1_CENTRAL_PLATFORM);
  modelsNextUpdate(
    0,
    270 * (levers[LEVER_ID_LEVEL1_DESCENT]!.$lerpValue - 1) +
      (2 + 5 * Math.cos(gameTime * 1.5)) * (1 - levers[LEVER_ID_GATE1]!.$lerpValue),
  );

  // blackPlatforms in the second level

  let oscillation = min(1 - levers[LEVER_ID_TRIANGLE_PLATFORM]!.$lerpValue2, levers[LEVER_ID_GATE1]!.$lerpValue2);

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_BLACK_PLATFORM0);
  modelsNextUpdate(oscillation * Math.sin(gameTime * 0.6 + 1.2) * 12, 0, 35);

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_BLACK_PLATFORM1);
  modelsNextUpdate(oscillation * Math.sin(gameTime * 0.6 - 1.2) * 8.2, 0, 55);

  // central oscillating platform

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_CENTRAL_PLATFORM);
  modelsNextUpdate(oscillation * Math.sin(gameTime * 0.6) * 12, 0, 45);

  // triangle platform

  verifyModelsNextUpdate(MODEL_ID_TRIANGLE_PLATFORM);
  modelsNextUpdate(9.8 * (1 - oscillation));

  // vertically oscillating mini platforms

  oscillation =
    clamp(1 - 5 * oscillation) *
    lerpneg(levers[LEVER_ID_TRIANGLE_PLATFORM]!.$lerpValue, levers[LEVER_ID_ROTATING_CORRIDOR]!.$lerpValue);

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_MINI_PLATFORM_VERTICAL);
  modelsNextUpdate(0, oscillation * Math.sin(gameTime * 1.35) * 4);

  // horizontaly oscillating mini platforms

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_MINI_PLATFORM_HORIZONTAL);
  modelsNextUpdate(0, 0, oscillation * Math.sin(gameTime * 0.9) * 8);

  // hex corridor door

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_HEX_CORRIDOR_DOOR);
  modelsNextUpdate(0, -6.5 * levers[LEVER_ID_TRIANGLE_PLATFORM]!.$lerpValue2);

  // elevators

  oscillation = lerpneg(levers[LEVER_ID_MONUMENT]!.$lerpValue2, levers[LEVER_ID_CRYSTALS]!.$lerpValue2);

  verifyModelsNextUpdate(MODEL_ID_ELEVATORS0);
  modelsNextUpdate(
    0,
    oscillation * Math.sin(gameTime) * 5 +
      3.5 * (1 - max(levers[LEVER_ID_CRYSTALS]!.$lerpValue, levers[LEVER_ID_MONUMENT]!.$lerpValue)),
  );

  verifyModelsNextUpdate(MODEL_ID_ELEVATORS1);
  modelsNextUpdate(0, oscillation * Math.sin(gameTime + 3) * 6, oscillation * Math.sin(gameTime * 0.6 + 1) * 6);

  // central sculpture/monument

  verifyModelsNextUpdate(MODEL_ID_MONUMENT);
  modelsNextUpdate(0, -7.3 * levers[LEVER_ID_MONUMENT]!.$lerpValue2);

  // pushing rods

  oscillation = lerpneg(
    levers[LEVER_ID_BEFORE_PUSHING_RODS]!.$lerpValue,
    levers[LEVER_ID_AFTER_PUSHING_RODS]!.$lerpValue,
  );

  verifyModelsNextUpdate(MODEL_ID_PUSHING_ROD0);
  modelsNextUpdate(0, -2, 10 - 8.5 * oscillation * abs(Math.sin(gameTime * 1.1)));

  verifyModelsNextUpdate(MODEL_ID_PUSHING_ROD1);
  modelsNextUpdate(0, -2, 10 - 8.5 * oscillation * abs(Math.sin(gameTime * 2.1)));

  verifyModelsNextUpdate(MODEL_ID_PUSHING_ROD2);
  modelsNextUpdate(
    0,
    -2,
    10 -
      8.5 *
        max(
          // push rods
          oscillation * abs(Math.sin(gameTime * 1.5)),
          // block rods
          (1 - levers[LEVER_ID_BEFORE_PUSHING_RODS]!.$lerpValue) * (1 - oscillation),
        ),
  );

  // oscillating hex pads

  const hexPadsOscillation = lerpneg(levers[LEVER_ID_DETOUR]!.$lerpValue2, levers[LEVER_ID_DONUT_PAD]!.$lerpValue2);

  for (let i = 0; i < 4; i++) {
    verifyModelsNextUpdate(MODEL_ID_OSCILLATING_HEX_PAD0 + i);
    modelsNextUpdate(
      (i > 2 ? 2 * (1 - hexPadsOscillation) + hexPadsOscillation : 0) - 100,
      hexPadsOscillation * Math.sin(gameTime * 1.3 + i * 1.7) * (3 + i / 3) + 0.7,
      115 -
        7 *
          (1 - levers[LEVER_ID_DETOUR]!.$lerpValue2) *
          (1 - levers[LEVER_ID_DONUT_PAD]!.$lerpValue2) *
          (i & 1 ? -1 : 1) +
        max(0.05, hexPadsOscillation) * Math.cos(gameTime * 1.3 + i * 7) * (4 - 2 * (1 - i / 3)),
    );
  }

  // jumping pads

  oscillation = lerpneg(
    levers[LEVER_ID_AFTER_ROTATING_PLATFORMS]!.$lerpValue2,
    levers[LEVER_ID_AFTER_JUMPING_PADS]!.$lerpValue2,
  );

  for (let i = 0; i < 3; ++i) {
    verifyModelsNextUpdate(MODEL_ID_JUMPING_PAD0 + i);
    modelsNextUpdate(
      0,
      oscillation * Math.sin(gameTime * 1.5 + i * 1.5) * 4 +
        (i
          ? 0
          : 3 *
            (1 - levers[LEVER_ID_AFTER_ROTATING_PLATFORMS]!.$lerpValue2) *
            (1 - levers[LEVER_ID_AFTER_JUMPING_PADS]!.$lerpValue2)),
    );
  }

  // floating elevator pad

  const floatingElevatorPad = lerpneg(
    lerpneg(
      (levers[LEVER_ID_AFTER_JUMPING_PADS]!.$lerpValue + levers[LEVER_ID_AFTER_JUMPING_PADS]!.$lerpValue2) / 2,
      levers[LEVER_ID_AFTER_ROTATING_PLATFORMS]!.$lerpValue2,
    ),
    (levers[LEVER_ID_FLOATING_ELEVATOR]!.$lerpValue + levers[LEVER_ID_FLOATING_ELEVATOR]!.$lerpValue2) / 2,
  );

  verifyModelsNextUpdate(MODEL_ID_FLOATING_ELEVATOR_PAD);
  modelsNextUpdate(0, 16 * floatingElevatorPad, 95 + 8.5 * clamp(floatingElevatorPad * 2 - 1));

  // in gate bars in first level
  verifyModelsNextUpdate(MODEL_ID_GATE0);
  modelsNextUpdate(0, -4.7 * levers[LEVER_ID_GATE0]!.$lerpValue, -15);

  // out gate bars in first level
  verifyModelsNextUpdate(MODEL_ID_GATE1);
  modelsNextUpdate(0, -4.7 * levers[LEVER_ID_GATE1]!.$lerpValue, 15);

  // central gate bars
  verifyModelsNextUpdate(MODEL_ID_GATE2);
  modelsNextUpdate(-99.7, -1.9 - 5.5 * levers[LEVER_ID_CRYSTALS]!.$lerpValue, 63.5);

  // far arc gate bars
  verifyModelsNextUpdate(MODEL_ID_GATE3);
  modelsNextUpdate(-100, 0.6 - 5.8 * levers[LEVER_ID_DONUT_PAD]!.$lerpValue, 96.5);

  /// **** FULL MATRIX TRANSFORMS **** ///

  const boatAnimationMatrix = (matrix: DOMMatrix) =>
    matrix
      .translateSelf(Math.sin(gameTime + 2) / 5, Math.sin(gameTime * 0.8) / 5)
      .rotateSelf(2 * Math.sin(gameTime), Math.sin(gameTime * 0.7), Math.sin(gameTime * 0.9));

  // first boad
  verifyModelsNextUpdate(MODEL_ID_BOAT0);
  boatAnimationMatrix(modelsNextUpdate(-12, 4.2, -66 + 40 * firstBoatLerp));

  // second boat
  verifyModelsNextUpdate(MODEL_ID_BOAT1);
  boatAnimationMatrix(modelsNextUpdate(-123, 1.4, 55 - 65 * secondBoatLerp));

  // rotating hex corridor

  verifyModelsNextUpdate(MODEL_ID_LEVEL2_ROTATING_HEX_CORRIDOR);
  modelsNextUpdate(
    -75,
    3 * (1 - levers[LEVER_ID_ROTATING_CORRIDOR]!.$lerpValue2) * (1 - levers[LEVER_ID_CRYSTALS]!.$lerpValue),
    55,
  ).rotateSelf(180 * (1 - levers[LEVER_ID_ROTATING_CORRIDOR]!.$lerpValue2) + rotatingHexCorridorRotation, 0);

  // donut pad

  verifyModelsNextUpdate(MODEL_ID_DONUT_PAD);
  modelsNextUpdate(
    2.5 * (1 - hexPadsOscillation) - 139.7,
    -3 * (1 - levers[LEVER_ID_DETOUR]!.$lerpValue) - hexPadsOscillation * Math.sin(gameTime * 0.8) - 1.8,
    93.5,
  ).rotateSelf(Math.cos(gameTime * 1.3) * (3 + 3 * hexPadsOscillation), 0);

  // pendulums

  verifyModelsNextUpdate(MODEL_ID_PENDULUMS);
  modelsNextUpdate(-2 * Math.sin(gameTime)).rotateSelf(25 * Math.sin(gameTime));

  // First rotating platform (with hole)

  verifyModelsNextUpdate(MODEL_ID_ROTATING_PLATFORM0);
  modelsNextUpdate(-81, 0.6, 106).rotateSelf(0, 40 + rotatingPlatform1Rotation);

  // Second rotating platform
  verifyModelsNextUpdate(MODEL_ID_ROTATING_PLATFORM1);
  modelsNextUpdate(-65.8, 0.8, 106).rotateSelf(0, rotatingPlatform2Rotation);

  // Third rotating platform

  verifyModelsNextUpdate(MODEL_ID_ROTATING_PLATFORM2);
  modelsNextUpdate(-50.7, 0.8, 106).rotateSelf(0, 180 - rotatingPlatform2Rotation);

  // Fourth rotating platform

  verifyModelsNextUpdate(MODEL_ID_ROTATING_PLATFORM3);
  modelsNextUpdate(-50.7, 0.8, 91).rotateSelf(0, 270 + rotatingPlatform2Rotation);

  /// **** OBJECTS **** ///

  // Update souls

  for (let i = 0; i < SOULS_COUNT; ++i) {
    souls[i]!();
    matrixToArray(tempMatrix, transformsBuffer, MODELS_WITH_FULL_TRANSFORM + i);
  }

  // Update levers

  for (let i = 0; i < LEVERS_COUNT; ++i) {
    levers[i]!();
    matrixToArray(tempMatrix, transformsBuffer, MODELS_WITH_FULL_TRANSFORM + SOULS_COUNT + i);
  }

  // Copy all models simple translation transform to the world uniform buffer
  for (
    let i = 0, j = (MODELS_WITH_FULL_TRANSFORM + LEVERS_COUNT + SOULS_COUNT) * 16, m: DOMMatrix;
    i < MODELS_WITH_SIMPLE_TRANSFORM;
    ++i, ++j
  ) {
    m = allModels[2 + i]!.$matrix;
    transformsBuffer[j++] = m.m41;
    transformsBuffer[j++] = m.m42;
    transformsBuffer[j++] = m.m43;
  }

  // Update player

  player_update();

  // Copy all models full matrices to the world uniform buffer

  for (let i = 0; i < MODELS_WITH_FULL_TRANSFORM; ++i) {
    matrixToArray(allModels[2 + MODELS_WITH_SIMPLE_TRANSFORM + i]!.$matrix, transformsBuffer, i);
  }
};
