"use client";

import { useState } from "react";

type Image = { image_url: string; is_main: boolean };

export default function CarGallery({
    images,
    alt,
}: {
    images: Image[];
    alt: string;
}) {
    const [active, setActive] = useState(0);

    if (images.length == 0) {
        return (
            <div className="gallery-main">
                <img src="/cars/placeholder.jpg" alt={alt}/>
            </div>
        );
    }

    return (
        <div className="gallery">
            <div className="gallery-main">
                <img src={images[active].image_url} alt={alt}/>
            </div>

            {images.length > 1 && (
                <div className="gallery-thumbnails">
                    {images.map((img,i) => (
                        <button key={img.image_url} type="button" className={`gallery-thumbnail ${i == active ? "gallery-thumbnail-active" : ""}`} onClick={() => setActive(i)} aria-label={`Слика ${i+1}`}>
                            <img src={img.image_url} alt=""/>
                        </button>
                    ))}
                </div>
            )}
    </div>
    );
}