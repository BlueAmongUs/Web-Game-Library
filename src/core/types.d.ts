import { Vector2 } from "../geometry";
import { Renderer } from "../graphics";

export type InstanceDrawFunction = (
    renderer: Renderer,
    size: Vector2, 
    position: Vector2
) => void