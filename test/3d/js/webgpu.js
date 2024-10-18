/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("canvas");
/**@type {GPUCanvasContext} */
const ctx = canvas.getContext("webgpu");

const canvas_format = navigator.gpu.getPreferredCanvasFormat()

async function triangle() {
    console.time("gpu");
    // Position, Colour
    const triangle_vertices = new Float32Array([
        -0.5, -0.5, 0, 1,   0, 0, 0, 1,
        0, 0.5, 0, 1,   0, 1, 0, 1,
        0.5, -0.5, 0, 1,    0, 0, 0, 1
    ]);
    
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    ctx.configure({
        device: device,
        format: canvas_format,
        alphaMode: "premultiplied",
    });
    
    const triangle_shader = device.createShaderModule({
        code: await (await fetch(
            new URL("lib/webgpu.wgsl", location.href)
        )).text()
    });

    const triangle_buffer = device.createBuffer({
        size: triangle_vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });

    device.queue.writeBuffer(
        triangle_buffer, 0,
        triangle_vertices, 0,
        triangle_vertices.length
    )

    const vertexBuffers = [
        {
            attributes: [
                {
                    shaderLocation: 0, // position
                    offset: 0,
                    format: "float32x4",
                },
                {
                    shaderLocation: 1, // colour
                    offset: 16,
                    format: "float32x4",
                },
            ],
            arrayStride: 32,
            stepMode: "vertex",
        },
    ];

    const pipelineDescriptor = {
        vertex: {
            module: triangle_shader,
            entryPoint: "vertex_main",
            buffers: vertexBuffers,
        },
        fragment: {
            module: triangle_shader,
            entryPoint: "fragment_main",
            targets: [
                {
                    format: canvas_format,
                },
            ],
        },
        primitive: {
            topology: "triangle-list",
        },
        layout: "auto",
    };


    const pipeline = device.createRenderPipeline(pipelineDescriptor);

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
        colorAttachments: [
            {
                clearValue: { r: 1, g: 1, b: 1.0, a: 1.0 },
                loadOp: "clear",
                storeOp: "store",
                view: ctx.getCurrentTexture().createView(),
            },
        ],
    });

    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, triangle_buffer);
    pass.draw(3);
    pass.end();

    device.queue.submit([encoder.finish()]);
    console.timeEnd("gpu")
}

triangle();