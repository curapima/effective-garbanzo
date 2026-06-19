"use client";

import { createElement, useEffect } from "react";
import { makePage } from "@keystatic/next/ui/app";
import config from "../../../keystatic.config";

const KeystaticPage = makePage(config);
const emptyHrefWarning =
  'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.';

type ConsolePatchState = {
  originalError: typeof console.error;
  count: number;
};

const patchKey = "__keystaticEmptyHrefConsolePatch__";

function getPatchState(): ConsolePatchState | undefined {
  return (globalThis as unknown as Record<string, ConsolePatchState | undefined>)[patchKey];
}

function setPatchState(state: ConsolePatchState | undefined) {
  (globalThis as unknown as Record<string, ConsolePatchState | undefined>)[patchKey] = state;
}

function installConsolePatch() {
  const existingState = getPatchState();

  if (existingState) {
    existingState.count += 1;
    return;
  }

  const originalError = console.error;

  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0] === emptyHrefWarning &&
      args[1] === "href" &&
      args[2] === "href"
    ) {
      return;
    }

    originalError(...args);
  };

  setPatchState({ originalError, count: 1 });
}

function uninstallConsolePatch() {
  const state = getPatchState();

  if (!state) {
    return;
  }

  state.count -= 1;

  if (state.count <= 0) {
    console.error = state.originalError;
    setPatchState(undefined);
  }
}

installConsolePatch();

export default function KeystaticApp() {
  useEffect(() => uninstallConsolePatch, []);

  return createElement(KeystaticPage);
}
