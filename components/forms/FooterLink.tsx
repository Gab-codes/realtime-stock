const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
  return (
    <div className="text-center pt-4">
      <p className="text-xs text-gray-500">
        {text}{" "}
        <a href={href} className="footer-link">
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default FooterLink;
