import { Button } from '@/components/ui/button';

interface SaveButtonProps {
  text: string;
  onSave: () => void;
  className?: string;
}

export default function SaveButton({ text, onSave }: SaveButtonProps) {
  const handleSave = () => {
    onSave();
    alert('Tweet saved!');
  };

  return <Button onClick={handleSave}>Save</Button>;
}
