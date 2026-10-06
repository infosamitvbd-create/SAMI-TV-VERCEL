import React from 'react';

export const PromotionalBanner: React.FC = () => {
  const adImgUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgi3lXYu-EBTBidSuCxKMGieeXALwfk39xKXnLkAX96jxJNwjYilphoVfU6uduH7qUcpoYVx3NAV_4WTI94AQcZVwL7Dk7i0ifiySQpbSRWIV-G6BUUg6JO1E0K6xtGoRdNOOZRZdSeUJJ92wvwUTh0omInsKzCUeKwLsjPBpDH_EkYJCfPgJfnDqZ6z-xs/s1942/766762737_1082421624137962_1384054351395670945_n.jpg";

  return (
    <div id="sami-promotional-banner" className="w-full pt-1 pb-0">
      <a
        href={adImgUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-2xl overflow-hidden border border-[#222738] bg-[#0c0e15] shadow-xl hover:border-red-600/50 transition-all duration-300 group"
      >
        <img
          src={adImgUrl}
          alt="Advertisement Banner"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-300"
          loading="lazy"
        />
      </a>
    </div>
  );
};

