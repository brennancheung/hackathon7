# Platform9 Hackathon #7

Welcome to the Platform9 Hackathon #7!

This project is an exploration of how we can bring computer science,
specifically compiler technology to make UI development easier and faster.

## Motivation

As technology "improves",  it seems like more and more code is required to do
what once took dramatically less code.

Just to set a "variable" in React + Redux you have to worry about dispatchers,
reducers, connecting components, maintaining constants for dispatch types, etc.
It is not uncommon to see this take up 20 lines of code spread across 5
different files.  This does not seem like progress.  In fact, it seems like we
are going backwards.

The motivation behind the original compiler was to allow the programmer to
operate at a higher level of abstraction and let the compiler figure out
the details and the plumbing.

Compilers take concepts that don't exist in the instruction set of the
CPU and translate these higher level concepts into something the CPU can
understand.

Ironically, to set a "variable" in assembly language it only requires a
single opcode `mov ax, 123`.

This Hackathon will explore using compiler technology to increase the level of
abstraction and remove boilerplate code required by the programmer to create
modern web applications.

## Objectives

1. Identify and define high level AST node abstractions used in UIs.
2. Inject these new AST nodes into the Babel AST tree.
3. Transform the new AST node types into something that can be compiled to JS.
4. Create a UI that illustrates each of these stages.

## References

* https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
