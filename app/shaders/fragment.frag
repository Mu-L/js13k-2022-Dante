#version 300 es
precision highp float;

#define vNormal vN
in highp vec4 vNormal;

#define vColor vC
in lowp vec4 vColor;

out vec4 O;

const vec3 reverseLightDirection = normalize(vec3(10, 2, 4));

void main() {
  vec3 normal = normalize(vNormal.xyz);
  float light = abs(dot(normal, reverseLightDirection)) + 0.3;
  O = vColor * light;
}