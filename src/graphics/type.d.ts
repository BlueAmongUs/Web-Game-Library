export type OnAnimateType = (
    renderer: Renderer, 
    delta_time?: number,
    time_elapsed?: number,
) => void

export type DrawType = "fill" | "stroke"