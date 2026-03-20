import React from 'react';
import './common.module.css';

const Avatar = ({
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    xs: 'avatar-xs',
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getFallbackContent = () => {
    if (fallback) return fallback;
    if (alt) return getInitials(alt);
    return 'U';
  };

  return (
    <div
      className={`avatar ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="avatar-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div className="avatar-fallback">
        {getFallbackContent()}
      </div>
    </div>
  );
};

export default Avatar;
