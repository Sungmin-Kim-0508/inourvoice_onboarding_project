import React, { useEffect, useRef } from "react";

interface Props {
  sectionElement: HTMLDivElement | null;
  isLoading: boolean;
}

export function ChatroomScrollbar({ isLoading, sectionElement }: Props) {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);

  const scrollbarElement = scrollbarRef.current;
  const thumbElement = scrollbarThumbRef.current;

  let isDragging = false;
  let startY = 0;

  const updateScrollbar = () => {
    if (sectionElement && scrollbarElement && thumbElement) {
      const { clientHeight, scrollHeight, scrollTop } = sectionElement;

      // 스크롤바의 top 위치를 현재 스크롤 위치에 맞춰 설정
      scrollbarElement.style.top = `${scrollTop}px`;

      // 스크롤 썸의 높이 계산 및 업데이트
      const thumbHeight = clientHeight ** 2 / scrollHeight;
      thumbElement.style.height = `${thumbHeight}px`;

      // 스크롤 썸의 위치 계산 및 업데이트
      const thumbPosition =
        (scrollTop / (scrollHeight - clientHeight)) *
        (clientHeight - thumbHeight);
      thumbElement.style.transform = `translateY(${thumbPosition}px)`;
    }
  };

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
  };

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging && sectionElement && thumbElement) {
      const deltaY = e.clientY - startY;
      const scrollFraction =
        deltaY / (sectionElement.clientHeight - thumbElement.clientHeight);
      sectionElement.scrollTop +=
        scrollFraction *
        (sectionElement.scrollHeight - sectionElement.clientHeight);
      startY = e.clientY;
    }
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  useEffect(() => {
    updateScrollbar();

    if (sectionElement && thumbElement) {
      sectionElement.addEventListener("scroll", updateScrollbar);
      window.addEventListener("resize", updateScrollbar);
      thumbElement.addEventListener("mousedown", handleDragStart);
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
    }

    return () => {
      if (sectionElement && thumbElement) {
        sectionElement.removeEventListener("scroll", updateScrollbar);
        window.removeEventListener("resize", updateScrollbar);
        thumbElement.removeEventListener("mousedown", handleDragStart);
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      }
    };
  }, [isLoading]);

  return (
    <div
      ref={scrollbarRef}
      className="absolute right-0 top-0 w-[14px] h-full bg-transparent"
    >
      <div
        ref={scrollbarThumbRef}
        className="rounded-[5px] w-2 translate-y-0 bg-[#71717A]"
      />
    </div>
  );
}
