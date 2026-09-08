import "../styles/avatar.css";

interface AvatarProps {
  src?: string;
  name?: string;
}

export function Avatar({ src, name }: AvatarProps) {
  const initial = name ? name[0].toUpperCase() : "#";

  return (
    <div className="avatar">
      {src ? (
        <img src={src} alt={name} className="avatar-img" />
      ) : (
        <span className="avatar-name">{initial}</span>
      )}
    </div>
  );
}
