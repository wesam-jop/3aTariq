import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Car, Clock, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TestimonialsSlider({ reviews }) {
    const { trans } = useTranslation();
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            align: 'start',
        },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const onInit = useCallback(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onInit();
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onInit);
    }, [emblaApi, onInit, onSelect]);

    const colors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-purple-100 text-purple-600',
        'bg-orange-100 text-orange-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600'
    ];

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">{trans('no_reviews')}</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {reviews.map((review, index) => {
                        const colorClass = colors[index % colors.length];
                        
                        return (
                            <div 
                                key={review.id} 
                                className="embla__slide min-w-0"
                                style={{
                                    flex: '0 0 100%',
                                    paddingLeft: '1rem',
                                }}
                            >
                                <div className="card bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                        <div className={`w-14 h-14 rounded-full ${colorClass} flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                                            {review.customer?.name?.charAt(0) || 'ع'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-bold text-gray-900 truncate text-base">
                                                {review.customer?.name || trans('customer')}
                                            </h4>
                                            <div className="flex gap-0.5 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`w-4 h-4 ${
                                                            i < review.rating 
                                                                ? 'text-yellow-500 fill-yellow-500' 
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Comment */}
                                    <div className="flex-1 mb-4">
                                        <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-4">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1 truncate flex-1">
                                            <Car className="w-3 h-3 flex-shrink-0" />
                                            <span className="truncate">{trans('driver')}: {review.driver?.user?.name || trans('driver')}</span>
                                        </div>
                                        <div className="flex items-center gap-1 flex-shrink-0 mr-2">
                                            <Clock className="w-3 h-3" />
                                            <span>
                                                {new Date(review.created_at).toLocaleDateString('ar-SY', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            {reviews.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all z-10 hover:scale-110"
                        aria-label={trans('previous')}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all z-10 hover:scale-110"
                        aria-label={trans('next')}
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </>
            )}

            {/* Dots Navigation */}
            {scrollSnaps.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 rounded-full transition-all ${
                                index === selectedIndex 
                                    ? 'bg-blue-600 w-8' 
                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                            }`}
                            aria-label={`${trans('go_to_slide')} ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
