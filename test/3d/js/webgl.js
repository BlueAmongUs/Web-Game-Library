import { initShaderProgram } from "./glshader.js";

/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (gl === null) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

async function main() {
    const vert_src = await (await fetch(
        new URL("lib/gl2vert.glsl", location.href)
    )).text();

    const frag_src = await (await fetch(
        new URL("lib/gl2frag.glsl", location.href)
    )).text();

    const shader_program = initShaderProgram(gl, vert_src, frag_src);

    // look up where the vertex data needs to go.
    let positionAttributeLocation = gl.getAttribLocation(shader_program, "a_position");
    let colorAttributeLocation = gl.getAttribLocation(shader_program, "a_color")

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    let pos_array = new Float32Array([
        -0.5, -0.5,
        0, 0.5,
        0.5, -0.5
    ]);

    let color_array = new Float32Array([
        1, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
    ]);

    gl.bufferData(gl.ARRAY_BUFFER, pos_array, gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, color_array, gl.STATIC_DRAW);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(
        colorAttributeLocation,
        4, gl.FLOAT, false,
        0, 0
    )
    gl.enableVertexAttribArray(colorAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = gl.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size, type,
        normalize, stride,
        offset
    );

    // Tell it to use our program (pair of shaders)
    gl.useProgram(shader_program);

    // draw
    let primitiveType = gl.TRIANGLE;
    offset = 0;
    let count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

main();