interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-none bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
