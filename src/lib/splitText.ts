/**
 * Split a text node into individual <span> elements for per-word or per-character animation.
 * This is a free alternative to GSAP's SplitText plugin.
 */
export function splitTextIntoSpans(
  element: HTMLElement,
  type: "words" | "chars" | "lines" = "words"
): HTMLSpanElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.style.overflow = "hidden";

  if (type === "words") {
    const words = text.split(/\s+/).filter(Boolean);
    return words.map((word, i) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word;
      inner.classList.add("split-word");

      wrapper.appendChild(inner);
      element.appendChild(wrapper);

      // Add space between words (except last)
      if (i < words.length - 1) {
        const space = document.createTextNode("\u00A0");
        element.appendChild(space);
      }

      return inner;
    });
  }

  if (type === "chars") {
    const chars = text.split("");
    return chars.map((char) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = char === " " ? "\u00A0" : char;
      span.classList.add("split-char");
      element.appendChild(span);
      return span;
    });
  }

  // lines — just wrap everything in one span (basic)
  const span = document.createElement("span");
  span.style.display = "inline-block";
  span.textContent = text;
  span.classList.add("split-line");
  element.appendChild(span);
  return [span];
}
