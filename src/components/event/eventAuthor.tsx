import { getFirstLetter } from '@/utils/getFirstLetter';
import Image from 'next/image';
import Link from 'next/link';

interface Author {
  authorName: string;
  authorImage: string | null;
}

const EventAuthor = ({ authorName, authorImage }: Author) => {
  return (
    <Link className="event-author-wrapper" href="/account/example" tabIndex={0}>
      <div className="author-avatar-wrapper" role="button">
        {authorImage ? (
          <Image
            src={authorImage}
            className="author-avatar-image"
            width={30}
            height={30}
            alt=""
          />
        ) : (
          getFirstLetter(authorName)
        )}
      </div>
      <p className="author-name-title">{authorName}</p>
    </Link>
  );
};

export default EventAuthor;
