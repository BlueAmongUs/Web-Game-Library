@group(0) @binding(0)
var<storage, read_write> output : array<f32>;

override BUFFER_SIZE: u32;

@compute @workgroup_size(64) fn main(
    @builtin(global_invocation_id) global_id : vec3u,
    @builtin(local_invocation_id) local_id : vec3u,
) {
    // Avoid accessing the buffer out of bounds
    if (global_id.x >= BUFFER_SIZE) {
        return;
    }
    output[global_id.x] = f32(global_id.x) * 1000.0 + f32(local_id.x); 
}
