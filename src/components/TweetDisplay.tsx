import { Textarea } from '@/components/ui/textarea';

interface TweetDisplayProps {
  tweet: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function TweetDisplay({ tweet, onChange }: TweetDisplayProps) {
  return (
    <Textarea
      value={tweet}
      onChange={onChange}
      className="w-full h-32"
      placeholder="Your generated tweet will appear here..."
    />
  );
}
