# Copilot Instructions

## TypeScript Code Style Guidelines

### Function Definition Rules

1. **Arrow Function Syntax**: All TypeScript functions must be defined using arrow function syntax.
   - ✅ Good: `const myFunction = () => { ... }`
   - ❌ Bad: `function myFunction() { ... }`
   - ❌ Bad: `export default function Component() { ... }`

2. **Type Inference**: Do NOT specify explicit return types for functions. Let TypeScript compiler automatically infer return types.
   - ✅ Good: `const getName = (id: string) => { return "John"; }`
   - ❌ Bad: `const getName = (id: string): string => { return "John"; }`
   - ✅ Good: `const fetchData = async () => { return await api.get('/data'); }`
   - ❌ Bad: `const fetchData = async (): Promise<Data> => { return await api.get('/data'); }`

### Documentation and Comments Rules

1. **No Comments in Code**: Do NOT add comments in the code. Code should be self-documenting through clear naming and structure.
   - ✅ Good: `const isValidEmail = email.includes('@');`
   - ❌ Bad: `const isValidEmail = email.includes('@'); // check if email has @`

2. **English Only**: All documentation and comments must be written in English.
   - ✅ Good: Documentation in English
   - ❌ Bad: Documentation in other languages

### Benefits

- Consistency across the codebase
- Reduced boilerplate and verbosity
- Better maintainability as return types are inferred
- Faster development with less type annotation overhead
