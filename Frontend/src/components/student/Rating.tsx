import { useEffect, useState } from 'react';

type RatingProps = {
  initialRating?: number;
  onRate?: (rating:number) => void | Promise<void>;
}

const Rating = ({initialRating = 0 , onRate} : RatingProps) => {
  const [rating , setRating] = useState(initialRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if(onRate) onRate(value)
  }

  useEffect(() => {
    if(initialRating){
      setRating(initialRating)
    }
  } , [initialRating]);

  return (
    <div>
      {Array.from({length : 5} , (_, index) => {
        const starValue = index + 1;
        return (
          <span onClick={() => handleRating(starValue)} key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500 ' : 'text-gray-400'}`}>
            &#9733;
          </span>
        )
      })}
    </div>
  )
}

export default Rating