import React, { useState, useEffect } from 'react';
import { Images, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { GALLERY_IMAGES } from '../../data/jwMarriottMuscatData';
import { GalleryImage } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

interface HotelGalleryProps {
  isLightboxOpen: boolean;
  setIsLightboxOpen: (open: boolean) => void;
  initialImageIndex?: number;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({
  isLightboxOpen,
  setIsLightboxOpen,
  initialImageIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter gallery items for modal
  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const categories = ['All', 'Exterior & Grounds', 'Rooms & Suites', 'Dining', 'Pools & Wellness', 'Meetings & Events'];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, filteredImages.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const openLightboxWithImage = (index: number) => {
    setActiveCategory('All');
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const currentImage: GalleryImage = filteredImages[currentIndex] || GALLERY_IMAGES[0];

  return (
    <section id="gallery-section" className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mosaic Hotel Gallery Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-2 h-[420px] sm:h-[500px] lg:h-[540px] overflow-hidden rounded-xs">
          {/* Main Large Hero Image (Left 7 Cols) */}
          <div
            onClick={() => openLightboxWithImage(0)}
            className="md:col-span-7 relative group cursor-pointer overflow-hidden h-full bg-stone-900"
          >
            <HotelImage
              src={GALLERY_IMAGES[0].url}
              alt={GALLERY_IMAGES[0].title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-bold block mb-1">
                {GALLERY_IMAGES[0].category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">{GALLERY_IMAGES[0].title}</h3>
              <p className="text-xs text-stone-300 hidden sm:block mt-1 max-w-lg leading-relaxed">{GALLERY_IMAGES[0].description}</p>
            </div>
          </div>

          {/* Supporting 4 Images in 2x2 Grid (Right 5 Cols) */}
          <div className="hidden md:grid md:col-span-5 grid-cols-2 grid-rows-2 gap-2 h-full">
            {GALLERY_IMAGES.slice(1, 5).map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightboxWithImage(idx + 1)}
                className="relative group cursor-pointer overflow-hidden bg-stone-900 h-full"
              >
                <HotelImage
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[11px] font-medium leading-tight truncate">{img.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Photos Button Overlay */}
          <button
            onClick={() => {
              setActiveCategory('All');
              setCurrentIndex(0);
              setIsLightboxOpen(true);
            }}
            className="absolute bottom-4 right-4 z-10 bg-white/95 hover:bg-white text-stone-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-xl flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95 border border-stone-200"
          >
            <Images className="w-4 h-4 text-[#c5a880]" />
            <span>View All Photos ({GALLERY_IMAGES.length})</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between backdrop-blur-md">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 text-white z-10">
            <div className="flex items-center space-x-3">
              <span className="font-serif tracking-widest text-xs uppercase text-[#c5a880] font-bold">
                JW Marriott Hotel Muscat
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-xs text-stone-400">
                Photo {currentIndex + 1} of {filteredImages.length}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-stone-400 hover:text-white transition p-1"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#c5a880] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close Lightbox (Esc)"
                aria-label="Close photo gallery"
              >
                <X className="w-4 h-4 text-[#c5a880]" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto px-4 py-2 bg-black/40 border-b border-stone-800 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-none transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#c5a880] text-black font-semibold'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main Photo Display Area */}
          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-12 py-4 overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition hover:scale-110 focus:outline-none"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[70vh] flex flex-col items-center">
              <HotelImage
                src={currentImage.url}
                alt={currentImage.title}
                className="max-h-[62vh] max-w-full object-contain shadow-2xl transition-all duration-300 rounded-xs"
              />
              <div className="text-center mt-3 text-white max-w-2xl px-4">
                <h4 className="font-serif text-base sm:text-lg font-medium">{currentImage.title}</h4>
                {currentImage.description && (
                  <p className="text-xs text-stone-400 mt-1">{currentImage.description}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition hover:scale-110 focus:outline-none"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="bg-black/80 border-t border-stone-800 p-3 overflow-x-auto no-scrollbar flex items-center justify-center space-x-2">
            {filteredImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 w-16 h-12 overflow-hidden rounded-xs border-2 transition ${
                  idx === currentIndex
                    ? 'border-[#c5a880] scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
