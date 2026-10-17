# Your photos

Drop your pictures in this folder, then list them in `src/data/profile.js` under `photos`:

```js
photos: {
  portrait: '/photos/portrait.jpg',          // shown in the About section (square-ish, 800×1000 works well)
  gallery: [
    { src: '/photos/gallery-1.jpg', caption: 'Hackathon night' },
    { src: '/photos/gallery-2.jpg', caption: 'Department fest' },
    { src: '/photos/gallery-3.jpg', caption: 'Field trip' },
  ],
},
```

Tips: keep each image under ~400 KB (use squoosh.app to compress). JPG or WebP.
