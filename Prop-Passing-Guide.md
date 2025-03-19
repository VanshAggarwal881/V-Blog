
# 📘 React Prop Passing Guide: post={post} vs {...post}

When passing props to a component in React, it's essential to understand the difference between passing an object **as a single prop** vs **spreading its properties individually**.

---

## ✅ 1. `post={post}` (Single Prop)
This passes the entire `post` object as one prop called `post`.

### Example:
```jsx
<PostForm post={post} />
```
### Access inside PostForm:
```js
function PostForm({ post }) {
  console.log(post.title); // Correct
}
```

### When to use:
- When your component expects a full object prop (e.g., `post`, `user`, etc.).
- Easier to manage and prevents confusion.

---

## ⚠️ 2. `{...post}` (Spread Props)
This spreads all key-value pairs of the `post` object as **individual props**.

### Example:
```jsx
<PostForm {...post} />
```
If `post = { title: "abc", content: "xyz" }`, then it's the same as:
```jsx
<PostForm title="abc" content="xyz" />
```

### Access inside PostForm:
```js
function PostForm({ title, content }) {
  console.log(title); // Correct
}
```

### When to use:
- Only if your component is designed to accept **individual fields** (not a full object).

---

## 🔥 Why issues happen:
If your `PostForm` is written like this:
```js
function PostForm({ post }) {
  const [title, setTitle] = useState(post.title || "");
}
```
Then using `<PostForm {...post} />` will break it, because there is **no `post` prop anymore** — just `title`, `content`, etc.

That’s why your form treated it as a **new post instead of an edit**, or didn't behave as expected.

---

## ✅ Best Practice:
✔ Stick with `post={post}` unless you're fully sure your component uses individual fields as props.

---

## 📌 Summary:
| Syntax | Behavior | Accessed As |
|--------|----------|-------------|
| `post={post}` | One object prop | `post.title` |
| `{...post}` | Multiple individual props | `title`, `content` |

---

Hope this helps make your React development clearer and more predictable!
