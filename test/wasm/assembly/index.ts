// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function mulU(a: u32, b: u32): i32 {
  let result = a;

  if (b === 0 || a === 0) return 0;


  for (let i = 0; i < (b - 1.0); i++) {
    result += a;
  }

  return result;
}

export function fib(n: i32): i32 {
  var a = 0, b = 1
  if (n > 0) {
    while (--n) {
      let t = a + b
      a = b
      b = t
    }
    return b
  }
  return a
}