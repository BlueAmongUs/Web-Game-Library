// Define global buffer size
const BUFFER_SIZE = 1000;

const div = document.querySelector("#div");

async function main() {
    console.time("t");
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const shader_src = await (await fetch(
        new URL("gpu.wgsl", location.href)
    )).text();

    const shader = device.createShaderModule({
        code: shader_src
    })


    const output = device.createBuffer({
        size: BUFFER_SIZE,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const stagingBuffer = device.createBuffer({
        size: BUFFER_SIZE,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.COMPUTE,
                buffer: {
                    type: "storage",
                },
            },
        ],
    });

    const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: output,
                },
            },
        ],
    });

    const computePipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout],
        }),
        compute: {
            module: shader,
            entryPoint: "main",
            constants: { BUFFER_SIZE }
        },
    });

    const commandEncoder = device.createCommandEncoder()
    const passEncoder = commandEncoder.beginComputePass()

    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));

    passEncoder.end();

    // Copy output buffer to staging buffer
    commandEncoder.copyBufferToBuffer(
        output,
        0, // Source offset
        stagingBuffer,
        0, // Destination offset
        BUFFER_SIZE,
    );

    // End frame by passing array of command buffers to command queue for execution
    device.queue.submit([commandEncoder.finish()]);

    // map staging buffer to read results back to JS
    await stagingBuffer.mapAsync(
        GPUMapMode.READ,
        0, // Offset
        BUFFER_SIZE, // Length
    );

    const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
    const data = copyArrayBuffer.slice();
    stagingBuffer.unmap();
    const result = new Float32Array(data)

    for (let i = 0; i < result.length; i++) {
        const result_el = document.createElement("p");
        result_el.textContent = i + " : " + result[i];
        div.appendChild(result_el);
    }
    
    console.timeEnd("t");
}

main();