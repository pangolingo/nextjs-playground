"use client";

const pika = () => {
  alert("PIKA PIKA!");
};
export default function PikaDialog() {
  return (
    <button className="btn" onClick={pika}>
      PIKA!
    </button>
  );
}
