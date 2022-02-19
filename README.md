This is a demo repo to show the way Vite is changing sourceMappingUrls.

### Build

```
yarn run build:vite
```
This generates an `index.es.js` file with the following `sourceMappingUrl`:

```
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjo...
```

### Test application using files in `dist/`

```
yarn run start:distTest
```
If you then look at the error we threw in the browser, it takes you to the non-sourcemapped
index.es.js file. Looking at the source we see Vite added a second set of sourcemaps:

```
export { TextInput };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjo...

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjo...
```

... and neither of them seem to work (in Chrome).

### Possibly related issue

... Although I couldn't reproduce it in this test repo, in my production repo, Vite actually
replaces the sourceMappingUrl.

In my `dist/index.es.js`, I see:

```
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjo...
```
But in the browser, that whole line is replaced with:
```
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Oz
```
Where the `s7Oz` just repeats to the end of the file. Seemingly that decodes to `:::::::...`?