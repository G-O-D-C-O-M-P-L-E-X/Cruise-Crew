export function SlidingBanner() {
  const text = " • UPTO 30% OFF !"
  const numberOfCopies = 14 // Number of copies to ensure smooth infinite scroll

  return (
    <div className="relative w-full font-syne overflow-hidden bg-black">
      <div className="animate-scroll font-montserrat flex w-fit py-[26px]">
        {/* Double the content to create seamless loop */}
        {[...Array(2)].map((_, parentIndex) => (
          <div key={parentIndex} className="flex">
            {[...Array(numberOfCopies)].map((_, index) => (
              <div
                key={index}
                className="flex items-center font-montserrat mr-2 gap-2.5 text-nowrap sm:text-xl  text-[#fffbf5]"
              >
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

