'use client'

export default function FaviconImg({ src }: { src: string }) {
  return (
    <img
      className="item-icon"
      src={src}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      onError={(e) => e.currentTarget.classList.add('errored')}
    />
  )
}
