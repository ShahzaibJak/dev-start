import consola from "consola";

function exitOnCancel(value: unknown): void {
  if (typeof value === "symbol") {
    process.exit(0);
  }
}

export async function promptText(
  message: string,
  defaultValue: string,
): Promise<string> {
  const value = await consola.prompt(message, {
    type: "text",
    default: defaultValue,
    placeholder: defaultValue,
  });

  exitOnCancel(value);

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${message} is required.`);
  }

  return value;
}

export async function promptConfirm(
  message: string,
  initial: boolean,
): Promise<boolean> {
  const value = await consola.prompt(message, {
    type: "confirm",
    initial,
  });

  exitOnCancel(value);

  if (typeof value !== "boolean") {
    throw new Error(`Expected a yes/no answer for "${message}".`);
  }

  return value;
}

export async function promptSelect(
  message: string,
  options: readonly string[],
  initial: string,
): Promise<string> {
  const value = await consola.prompt(message, {
    type: "select",
    options: [...options],
    initial,
  });

  exitOnCancel(value);

  if (typeof value !== "string" || !options.includes(value)) {
    throw new Error(`Expected one of: ${options.join(", ")}.`);
  }

  return value;
}
