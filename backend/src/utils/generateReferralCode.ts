export const generateReferralCode = (name: string): string => {
    const cleaned = name.replace(/\s+/g, "").toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000); 
    return `${cleaned}${random}`;
  };
  