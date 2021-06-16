export default function useStyle(user) {
  const styleKey = user === "me" ? "me" : "notme";
  const style = {
    me: { backgroundColor: "#1c2439", color: "#fff", order: 1 },
    notme: { backgroundColor: "#fff", color: "#1c2439", order: null },
  };

  return style[styleKey];
}
