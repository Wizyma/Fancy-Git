# Fancy-Git

Fancy-Git is (or will be) a minimalist git explorer
=======================

**Init commands**

* clone the repo and run npm install
* npm run dev:start to run client
* npm run dev:server to start the server

To use it you will need a github token for the api create one then create a file called config.json at the root of the project with the same keys as the file **template.config.json**


If you wish to run the app with electron please start first the client and the server then run :

* npm run desk

>To fix typescript graphql error add these two interface in
>
>node_modules/@types/graphql/subscription/subscribe.d.ts

```javascript
interface AsyncIterator<T> {
    next(value?: any): Promise<IteratorResult<T>>;
    return?(value?: any): Promise<IteratorResult<T>>;
    throw?(e?: any): Promise<IteratorResult<T>>;
}

interface AsyncIterable<T> {
    next(value?: any): Promise<IteratorResult<T>>;
    return?(value?: any): Promise<IteratorResult<T>>;
    throw?(e?: any): Promise<IteratorResult<T>>;
}
```
