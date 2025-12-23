// searchableServices.js
// Données complètes pour la recherche avec autocomplétion
// Basé sur FilterBar.jsx - 23 services et toutes leurs sous-catégories

const searchableServices = [
  // ═══════════════════════════════════════════════════════════════════
  // 1. BABYSITTING - שמרטפות
  // ═══════════════════════════════════════════════════════════════════
  { label: 'שמרטפות', href: '/services/babysitting', type: 'service' },
  { label: 'שמרטפות מזדמנת', href: '/services/babysitting', type: 'specialty' },
  { label: 'שמרטפות קבועה בבית הלקוח', href: '/services/babysitting', type: 'specialty' },
  { label: 'הוצאה מהגן / מבית-הספר', href: '/services/babysitting', type: 'specialty' },
  { label: 'שמירה בלילה', href: '/services/babysitting', type: 'specialty' },
  { label: 'שמירה בזמן חופשות', href: '/services/babysitting', type: 'specialty' },
  { label: 'עזרה בשיעורי בית', href: '/services/babysitting', type: 'specialty' },
  { label: 'מטפלת במשרה מלאה', href: '/services/babysitting', type: 'specialty' },
  { label: 'קייטנת קיץ', href: '/services/babysitting', type: 'specialty' },
  { label: 'קייטנת חורף', href: '/services/babysitting', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CLEANING - ניקיון
  // ═══════════════════════════════════════════════════════════════════
  { label: 'ניקיון', href: '/services/cleaning', type: 'service' },
  // ניקיון ביתי
  { label: 'ניקיון שוטף', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון פסח', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון אחרי שיפוץ', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון לדירות Airbnb', href: '/services/cleaning', type: 'specialty' },
  // ניקיון משרדים ומבנים
  { label: 'ניקיון משרדים', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון חנויות', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון בניינים', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון מוסדות חינוך', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון מפעלים', href: '/services/cleaning', type: 'specialty' },
  // ניקיון מיוחד
  { label: 'ניקוי חלונות בגובה', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקוי שטיחים וספות', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקוי וילונות', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקוי בלחץ מים (טרסות, חזיתות)', href: '/services/cleaning', type: 'specialty' },
  { label: 'חיטוי וניקיון אחרי נזק (שריפה / הצפה)', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקוי מזגן', href: '/services/cleaning', type: 'specialty' },
  { label: 'ריסוס (נגד חרקים)', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקיון גגות רעפים', href: '/services/cleaning', type: 'specialty' },
  // שירותים נוספים
  { label: 'ניקוי רכב בבית הלקוח', href: '/services/cleaning', type: 'specialty' },
  { label: 'ניקוי פאנלים סולאריים', href: '/services/cleaning', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 3. GARDENING - גינון
  // ═══════════════════════════════════════════════════════════════════
  { label: 'גינון', href: '/services/gardening', type: 'service' },
  { label: 'גנן', href: '/services/gardening', type: 'service' },
  // סוגי שירותים
  { label: 'גיזום עצים ושיחים', href: '/services/gardening', type: 'specialty' },
  { label: 'עיצוב גינה', href: '/services/gardening', type: 'specialty' },
  { label: 'שתילת צמחים', href: '/services/gardening', type: 'specialty' },
  { label: 'השקיה', href: '/services/gardening', type: 'specialty' },
  { label: 'דישון', href: '/services/gardening', type: 'specialty' },
  { label: 'ניכוש עשבים', href: '/services/gardening', type: 'specialty' },
  { label: 'תחזוקה כללית גינה', href: '/services/gardening', type: 'specialty' },
  // שירותים נוספים
  { label: 'פינוי פסולת גינה', href: '/services/gardening', type: 'specialty' },
  { label: 'ייעוץ עיצוב נוף', href: '/services/gardening', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 4. PETCARE - טיפול בחיות מחמד
  // ═══════════════════════════════════════════════════════════════════
  { label: 'טיפול בחיות מחמד', href: '/services/petcare', type: 'service' },
  { label: 'פט סיטר', href: '/services/petcare', type: 'service' },
  // סוגי חיות
  { label: 'שמירה על כלבים', href: '/services/petcare', type: 'specialty' },
  { label: 'שמירה על חתולים', href: '/services/petcare', type: 'specialty' },
  { label: 'שמירה על ציפורים', href: '/services/petcare', type: 'specialty' },
  { label: 'שמירה על מכרסמים קטנים', href: '/services/petcare', type: 'specialty' },
  { label: 'שמירה על דגים', href: '/services/petcare', type: 'specialty' },
  { label: 'שמירה על זוחלים', href: '/services/petcare', type: 'specialty' },
  // שירותים נוספים
  { label: 'הליכת כלבים', href: '/services/petcare', type: 'specialty' },
  { label: 'רחצה וטיפוח', href: '/services/petcare', type: 'specialty' },
  { label: 'אילוף בסיסי', href: '/services/petcare', type: 'specialty' },
  { label: 'מתן תרופות לחיות', href: '/services/petcare', type: 'specialty' },
  { label: 'האכלה בזמן השמירה', href: '/services/petcare', type: 'specialty' },
  { label: 'ניקוי ארגז חול / כלוב / אקווריום', href: '/services/petcare', type: 'specialty' },
  { label: 'עדכון תמונות לבעלים', href: '/services/petcare', type: 'specialty' },
  { label: 'שהייה ביום בלבד', href: '/services/petcare', type: 'specialty' },
  { label: 'לינה ללילה', href: '/services/petcare', type: 'specialty' },
  // שירותים וטרינריים
  { label: 'ביקור וטרינר', href: '/services/petcare', type: 'specialty' },
  { label: 'טיפול בסיסי לחיות', href: '/services/petcare', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 5. TUTORING - שיעורים פרטיים (69 sous-catégories)
  // ═══════════════════════════════════════════════════════════════════
  { label: 'שיעורים פרטיים', href: '/services/tutoring', type: 'service' },
  { label: 'מורה פרטי', href: '/services/tutoring', type: 'service' },
  // מקצועות לימוד
  { label: 'מתמטיקה', href: '/services/tutoring', type: 'specialty' },
  { label: 'פיזיקה', href: '/services/tutoring', type: 'specialty' },
  { label: 'כימיה', href: '/services/tutoring', type: 'specialty' },
  { label: 'ביולוגיה', href: '/services/tutoring', type: 'specialty' },
  { label: 'אנגלית', href: '/services/tutoring', type: 'specialty' },
  { label: 'עברית', href: '/services/tutoring', type: 'specialty' },
  { label: 'ספרות', href: '/services/tutoring', type: 'specialty' },
  { label: 'היסטוריה', href: '/services/tutoring', type: 'specialty' },
  { label: 'אזרחות', href: '/services/tutoring', type: 'specialty' },
  { label: 'תנ"ך', href: '/services/tutoring', type: 'specialty' },
  { label: 'גיאוגרפיה', href: '/services/tutoring', type: 'specialty' },
  { label: 'מדעי המחשב', href: '/services/tutoring', type: 'specialty' },
  // מוזיקה וכלי נגינה
  { label: 'פסנתר', href: '/services/tutoring', type: 'specialty' },
  { label: 'גיטרה', href: '/services/tutoring', type: 'specialty' },
  { label: 'כינור', href: '/services/tutoring', type: 'specialty' },
  { label: 'חליל', href: '/services/tutoring', type: 'specialty' },
  { label: 'תופים', href: '/services/tutoring', type: 'specialty' },
  { label: 'פיתוח קול', href: '/services/tutoring', type: 'specialty' },
  { label: 'תיאוריה מוזיקלית', href: '/services/tutoring', type: 'specialty' },
  // אמנות חזותית
  { label: 'ציור', href: '/services/tutoring', type: 'specialty' },
  { label: 'רישום', href: '/services/tutoring', type: 'specialty' },
  { label: 'פיסול', href: '/services/tutoring', type: 'specialty' },
  { label: 'צילום', href: '/services/tutoring', type: 'specialty' },
  { label: 'עיצוב גרפי', href: '/services/tutoring', type: 'specialty' },
  { label: 'קריקטורה', href: '/services/tutoring', type: 'specialty' },
  { label: 'אנימציה', href: '/services/tutoring', type: 'specialty' },
  // מחול ותנועה
  { label: 'בלט', href: '/services/tutoring', type: 'specialty' },
  { label: 'היפ הופ', href: '/services/tutoring', type: 'specialty' },
  { label: 'ריקודי עם', href: '/services/tutoring', type: 'specialty' },
  { label: 'ריקודים לטיניים', href: '/services/tutoring', type: 'specialty' },
  { label: 'יוגה', href: '/services/tutoring', type: 'specialty' },
  // תיאטרון ובמה
  { label: 'משחק', href: '/services/tutoring', type: 'specialty' },
  { label: 'אימפרוביזציה', href: '/services/tutoring', type: 'specialty' },
  { label: 'סטנדאפ', href: '/services/tutoring', type: 'specialty' },
  { label: 'דיקלום ונאום', href: '/services/tutoring', type: 'specialty' },
  // שפות ותרבויות
  { label: 'צרפתית', href: '/services/tutoring', type: 'specialty' },
  { label: 'ספרדית', href: '/services/tutoring', type: 'specialty' },
  { label: 'גרמנית', href: '/services/tutoring', type: 'specialty' },
  { label: 'רוסית', href: '/services/tutoring', type: 'specialty' },
  { label: 'ערבית', href: '/services/tutoring', type: 'specialty' },
  { label: 'סינית', href: '/services/tutoring', type: 'specialty' },
  { label: 'יפנית', href: '/services/tutoring', type: 'specialty' },
  // יצירה ועבודות יד
  { label: 'סריגה', href: '/services/tutoring', type: 'specialty' },
  { label: 'תפירה', href: '/services/tutoring', type: 'specialty' },
  { label: 'קרמיקה', href: '/services/tutoring', type: 'specialty' },
  { label: 'נגרות', href: '/services/tutoring', type: 'specialty' },
  { label: 'תכשיטנות', href: '/services/tutoring', type: 'specialty' },
  // טכנולוגיה ומדע יישומי
  { label: 'תכנות', href: '/services/tutoring', type: 'specialty' },
  { label: 'רובוטיקה', href: '/services/tutoring', type: 'specialty' },
  { label: 'אלקטרוניקה', href: '/services/tutoring', type: 'specialty' },
  { label: 'עיצוב תלת מימד', href: '/services/tutoring', type: 'specialty' },
  { label: 'מדעי הנתונים', href: '/services/tutoring', type: 'specialty' },
  // קולינריה
  { label: 'בישול', href: '/services/tutoring', type: 'specialty' },
  { label: 'אפייה', href: '/services/tutoring', type: 'specialty' },
  { label: 'קונדיטוריה', href: '/services/tutoring', type: 'specialty' },
  { label: 'שוקולד', href: '/services/tutoring', type: 'specialty' },
  // פיתוח אישי ומיומנויות
  { label: 'כתיבה יוצרת', href: '/services/tutoring', type: 'specialty' },
  { label: 'שחמט', href: '/services/tutoring', type: 'specialty' },
  { label: 'זכרון וריכוז', href: '/services/tutoring', type: 'specialty' },
  { label: 'קריאה מהירה', href: '/services/tutoring', type: 'specialty' },
  { label: 'קואצ\'ינג לבני נוער', href: '/services/tutoring', type: 'specialty' },
  // ספורט
  { label: 'כדורגל', href: '/services/tutoring', type: 'specialty' },
  { label: 'כדורסל', href: '/services/tutoring', type: 'specialty' },
  { label: 'טניס', href: '/services/tutoring', type: 'specialty' },
  { label: 'שחייה', href: '/services/tutoring', type: 'specialty' },
  { label: 'אמנויות לחימה', href: '/services/tutoring', type: 'specialty' },
  { label: 'התעמלות', href: '/services/tutoring', type: 'specialty' },
  { label: 'כושר אישי', href: '/services/tutoring', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 6. ELDERCARE - טיפול בקשישים
  // ═══════════════════════════════════════════════════════════════════
  { label: 'טיפול בקשישים', href: '/services/eldercare', type: 'service' },
  { label: 'מטפל סיעודי', href: '/services/eldercare', type: 'service' },
  // סוגי טיפול
  { label: 'ליווי ותמיכה', href: '/services/eldercare', type: 'specialty' },
  { label: 'עזרה בניקיון הבית לקשישים', href: '/services/eldercare', type: 'specialty' },
  { label: 'בישול והכנת אוכל לקשישים', href: '/services/eldercare', type: 'specialty' },
  { label: 'קניות ומשימות לקשישים', href: '/services/eldercare', type: 'specialty' },
  { label: 'מתן תרופות לקשישים', href: '/services/eldercare', type: 'specialty' },
  { label: 'ליווי לרופאים', href: '/services/eldercare', type: 'specialty' },
  // ניסיון עם מחלות ספציפיות
  { label: 'טיפול באלצהיימר', href: '/services/eldercare', type: 'specialty' },
  { label: 'טיפול בפרקינסון', href: '/services/eldercare', type: 'specialty' },
  { label: 'טיפול בסוכרת', href: '/services/eldercare', type: 'specialty' },
  { label: 'טיפול בבעיות ניידות', href: '/services/eldercare', type: 'specialty' },
  { label: 'טיפול בדמנציה', href: '/services/eldercare', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 7. LAUNDRY - כביסה וגיהוץ
  // ═══════════════════════════════════════════════════════════════════
  { label: 'כביסה וגיהוץ', href: '/services/laundry', type: 'service' },
  { label: 'גיהוץ בבית הלקוח', href: '/services/laundry', type: 'specialty' },
  { label: 'איסוף והחזרת כביסה (שירות משלוחים)', href: '/services/laundry', type: 'specialty' },
  { label: 'ניקוי יבש / שירות מכבסה', href: '/services/laundry', type: 'specialty' },
  { label: 'כביסת מצעים, מגבות, וילונות', href: '/services/laundry', type: 'specialty' },
  { label: 'כביסה תעשייתית (מלונות, מסעדות)', href: '/services/laundry', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 8. PROPERTY MANAGEMENT - ניהול נכסים
  // ═══════════════════════════════════════════════════════════════════
  { label: 'ניהול נכסים', href: '/services/property_management', type: 'service' },
  // ניהול השכרה לשנה מלאה
  { label: 'חיפוש ובדיקת שוכרים מתאימים', href: '/services/property_management', type: 'specialty' },
  { label: 'חתימה על חוזה וניהול ערבויות', href: '/services/property_management', type: 'specialty' },
  { label: 'גביית שכ"ד והעברת תשלומים לבעל הדירה', href: '/services/property_management', type: 'specialty' },
  { label: 'בדיקת מצב הנכס לפני ואחרי תקופת השכירות', href: '/services/property_management', type: 'specialty' },
  { label: 'העברת חשבונות השירותים על שם השוכר החדש', href: '/services/property_management', type: 'specialty' },
  // השכרה לטווח קצר (Airbnb / Booking)
  { label: 'פרסום וניהול מודעות באתרים', href: '/services/property_management', type: 'specialty' },
  { label: 'ניהול הזמנות ותקשורת עם אורחים', href: '/services/property_management', type: 'specialty' },
  { label: 'קבלת אורחים / מסירת מפתחות', href: '/services/property_management', type: 'specialty' },
  { label: 'ניקיון בין השהיות', href: '/services/property_management', type: 'specialty' },
  { label: 'בדיקה תקופתית של הנכס', href: '/services/property_management', type: 'specialty' },
  { label: 'תיקונים כלליים (חשמל, אינסטלציה, מזגן)', href: '/services/property_management', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 9. ELECTRICIAN - חשמלאי
  // ═══════════════════════════════════════════════════════════════════
  { label: 'חשמלאי', href: '/services/electrician', type: 'service' },
  { label: 'חשמלאים', href: '/services/electrician', type: 'service' },
  // תיקונים
  { label: 'תיקון קצר', href: '/services/electrician', type: 'specialty' },
  { label: 'תיקון טיימר', href: '/services/electrician', type: 'specialty' },
  { label: 'תיקון לוח חשמל', href: '/services/electrician', type: 'specialty' },
  { label: 'החלפת שקעים', href: '/services/electrician', type: 'specialty' },
  { label: 'תיקון\\החלפת ספוטים', href: '/services/electrician', type: 'specialty' },
  { label: 'תיקוני חשמל אחרים', href: '/services/electrician', type: 'specialty' },
  { label: 'החלפת אוטומט חדר מדרגות', href: '/services/electrician', type: 'specialty' },
  // התקנות
  { label: 'התקנת מאוורר תקרה', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת שקע חשמל', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת נקודת חשמל חדשה', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת אטמור', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת מתג', href: '/services/electrician', type: 'specialty' },
  { label: 'עמדת טעינה לרכב חשמלי', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת שעון שבת', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנות חשמל אחרות', href: '/services/electrician', type: 'specialty' },
  { label: 'עמדת טעינה לרכב חשמלי של חברת EV-Meter', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנות כיריים אינדוקציה', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת תנור אמבטיה', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת גנרטור לבית פרטי', href: '/services/electrician', type: 'specialty' },
  { label: 'התקנת ונטה', href: '/services/electrician', type: 'specialty' },
  { label: 'עמדת טעינה לרכב חשמלי EV-EDGE', href: '/services/electrician', type: 'specialty' },
  // עבודות חשמל גדולות
  { label: 'בניית תשתית חשמל בכל הבית', href: '/services/electrician', type: 'specialty' },
  { label: 'החלפת תשתית חשמל בכל הבית', href: '/services/electrician', type: 'specialty' },
  { label: 'החלפת לוח חשמל', href: '/services/electrician', type: 'specialty' },
  { label: 'הארקה', href: '/services/electrician', type: 'specialty' },
  { label: 'החלפה לתלת פאזי', href: '/services/electrician', type: 'specialty' },
  { label: 'הכנה לביקורת עבור חברת חשמל', href: '/services/electrician', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 10. PLUMBING - אינסטלציה
  // ═══════════════════════════════════════════════════════════════════
  { label: 'אינסטלציה', href: '/services/plumbing', type: 'service' },
  { label: 'אינסטלטור', href: '/services/plumbing', type: 'service' },
  // סתימות
  { label: 'פתיחת סתימה בבית', href: '/services/plumbing', type: 'specialty' },
  { label: 'משאבה טבולה', href: '/services/plumbing', type: 'specialty' },
  { label: 'פתיחת סתימה בבנין', href: '/services/plumbing', type: 'specialty' },
  // תיקון צנרת
  { label: 'תיקון צנרת גברית', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקון נזקי צנרת בבית', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקון נזקי צנרת בבניין', href: '/services/plumbing', type: 'specialty' },
  { label: 'הגברת לחץ מים', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקון צנרת בגינה', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקוני צנרת אחרים', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקון צנרת ביוב ללא הרס', href: '/services/plumbing', type: 'specialty' },
  // עבודות גדולות
  { label: 'החלפת צנרת בבית', href: '/services/plumbing', type: 'specialty' },
  { label: 'החלפת צנרת בבניין', href: '/services/plumbing', type: 'specialty' },
  { label: 'התקנת נקודות מים חדשות', href: '/services/plumbing', type: 'specialty' },
  { label: 'החלפת קו ביוב בבית', href: '/services/plumbing', type: 'specialty' },
  { label: 'החלפת קו ביוב בבניין', href: '/services/plumbing', type: 'specialty' },
  { label: 'הקמת קו ביוב חדש', href: '/services/plumbing', type: 'specialty' },
  { label: 'החלפת צנרת בגינה', href: '/services/plumbing', type: 'specialty' },
  { label: 'התקנת מזח', href: '/services/plumbing', type: 'specialty' },
  // תיקון והתקנת אביזרי אינסטלציה
  { label: 'התקנת בר מים', href: '/services/plumbing', type: 'specialty' },
  { label: 'ניאגרה סמויה', href: '/services/plumbing', type: 'specialty' },
  { label: 'ברזים', href: '/services/plumbing', type: 'specialty' },
  { label: 'ניאגרות ואסלות', href: '/services/plumbing', type: 'specialty' },
  { label: 'מסנני מים', href: '/services/plumbing', type: 'specialty' },
  { label: 'התקנת טוחן אשפה', href: '/services/plumbing', type: 'specialty' },
  { label: 'תיקון טוחן אשפה', href: '/services/plumbing', type: 'specialty' },
  { label: 'כיורים', href: '/services/plumbing', type: 'specialty' },
  { label: 'הכנה למדיח כלים', href: '/services/plumbing', type: 'specialty' },
  { label: 'אגנית למקלחון', href: '/services/plumbing', type: 'specialty' },
  { label: 'אביזרי אינסטלציה אחרים', href: '/services/plumbing', type: 'specialty' },
  { label: 'סילוקית לאסלה', href: '/services/plumbing', type: 'specialty' },
  { label: 'התקנת בידה', href: '/services/plumbing', type: 'specialty' },
  { label: 'אסלה תלויה', href: '/services/plumbing', type: 'specialty' },
  { label: 'אל חוזר לשעון מים', href: '/services/plumbing', type: 'specialty' },
  { label: 'התקנת מערכות מים תת כיוריות', href: '/services/plumbing', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 11. AIR CONDITIONING - מיזוג אוויר
  // ═══════════════════════════════════════════════════════════════════
  { label: 'מיזוג אוויר', href: '/services/air_conditioning', type: 'service' },
  { label: 'טכנאי מזגנים', href: '/services/air_conditioning', type: 'service' },
  // התקנת מזגנים
  { label: 'התקנת מזגן', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'התקנת מיזוג מיני מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'התקנת מיזוג מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'התקנת מזגן אינוורטר', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'התקנת מזגן מולטי אינוורטר', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'התקנת מזגן VRF', href: '/services/air_conditioning', type: 'specialty' },
  // תיקון מזגנים
  { label: 'תיקון מזגן', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון מזגן מעובש', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון מיזוג מיני מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון דליפת גז במזגן', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון מיזוג מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון מזגן אינוורטר', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון מזגן VRF', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'ניקוי פילטרים', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'תיקון צ\'ילרים', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'טכנאי חדרי קירור', href: '/services/air_conditioning', type: 'specialty' },
  // פירוק והרכבת מזגנים
  { label: 'פירוק והרכבת מזגן', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'פירוק מיזוג מיני מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'פירוק מיזוג מרכזי', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'פירוק מזגן אינוורטר', href: '/services/air_conditioning', type: 'specialty' },
  { label: 'פירוק מזגן VRF', href: '/services/air_conditioning', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 12. GAS TECHNICIAN - טכנאי גז
  // ═══════════════════════════════════════════════════════════════════
  { label: 'טכנאי גז', href: '/services/gas_technician', type: 'service' },
  { label: 'גז', href: '/services/gas_technician', type: 'service' },
  // התקנת צנרת גז בבית
  { label: 'הזזת\\התקנת נקודת גז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'התקנת כיריים גז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'התקנת צינור גז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'התקנת גריל גז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'התקנת חימום מים בגז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'התקנת חגז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'בניית תשתית גז במבנה חדש', href: '/services/gas_technician', type: 'specialty' },
  { label: 'שירותי גז לעסקים', href: '/services/gas_technician', type: 'specialty' },
  // תיקוני גז בבית
  { label: 'תיקון כיריים גז', href: '/services/gas_technician', type: 'specialty' },
  { label: 'תיקון צנרת גז', href: '/services/gas_technician', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 13. DRYWALL - עבודות גבס
  // ═══════════════════════════════════════════════════════════════════
  { label: 'עבודות גבס', href: '/services/drywall', type: 'service' },
  { label: 'גבסן', href: '/services/drywall', type: 'service' },
  // עיצובים בגבס
  { label: 'נישות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'מזנון גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'ספריות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'כוורות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'תאורה נסתרת בגבס', href: '/services/drywall', type: 'specialty' },
  { label: 'קרניז גבס מעוגל', href: '/services/drywall', type: 'specialty' },
  { label: 'קשתות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'תקרה צפה', href: '/services/drywall', type: 'specialty' },
  { label: 'קיר צף', href: '/services/drywall', type: 'specialty' },
  // עבודות גבס
  { label: 'בניית קירות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'בניית תקרות גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'בניית מדפי גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'הנמכת תקרה למזגן', href: '/services/drywall', type: 'specialty' },
  { label: 'חיפוי גבס לצנרת', href: '/services/drywall', type: 'specialty' },
  { label: 'בניית סינר\\קרניז גבס', href: '/services/drywall', type: 'specialty' },
  { label: 'בידוד אקוסטי', href: '/services/drywall', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 14. CARPENTRY - נגרות
  // ═══════════════════════════════════════════════════════════════════
  { label: 'נגרות', href: '/services/carpentry', type: 'service' },
  { label: 'נגר', href: '/services/carpentry', type: 'service' },
  // בניית רהיטים
  { label: 'בניית ארונות קיר', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית ארונות הזזה', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית ארונות אמבטיה', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית חדר שינה', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית שולחן', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית כסאות', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית מזנון', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית ספריה', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית רהיטים ייחודים', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית מדפים', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית חדר ארונות', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית מיטה מעץ', href: '/services/carpentry', type: 'specialty' },
  // תיקון רהיטים
  { label: 'תיקון ארונות קיר', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון שולחן', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון כסאות', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון ארונות הזזה', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון ארונות אמבטיה', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון חדר שינה', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון מזנון', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון ספרייה', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון רהיטים אחרים', href: '/services/carpentry', type: 'specialty' },
  // עבודות נגרות אחרות
  { label: 'חיפוי עץ לקיר', href: '/services/carpentry', type: 'specialty' },
  { label: 'פירוק והרכבת רהיטים', href: '/services/carpentry', type: 'specialty' },
  { label: 'תיקון ובניית דלתות', href: '/services/carpentry', type: 'specialty' },
  { label: 'חידוש דלתות כניסה מעץ', href: '/services/carpentry', type: 'specialty' },
  { label: 'בניית קומת גלריה', href: '/services/carpentry', type: 'specialty' },
  { label: 'מדרגות עץ לבית', href: '/services/carpentry', type: 'specialty' },
  { label: 'משרביות מעץ', href: '/services/carpentry', type: 'specialty' },
  { label: 'בוצ\'ר עץ', href: '/services/carpentry', type: 'specialty' },
  // נגרות חוץ - פרגולות
  { label: 'פרגולות עץ', href: '/services/carpentry', type: 'specialty' },
  { label: 'פרגולות הצללה', href: '/services/carpentry', type: 'specialty' },
  { label: 'סגירת מרפסת', href: '/services/carpentry', type: 'specialty' },
  // נגרות חוץ - דקים
  { label: 'דקים מעץ טבעי', href: '/services/carpentry', type: 'specialty' },
  { label: 'דק סינטטי (קומפוזיט)', href: '/services/carpentry', type: 'specialty' },
  { label: 'שיקום / חידוש דקים', href: '/services/carpentry', type: 'specialty' },
  // נגרות חוץ - גדרות
  { label: 'גדרות עץ', href: '/services/carpentry', type: 'specialty' },
  { label: 'מחיצות עץ לגינה', href: '/services/carpentry', type: 'specialty' },
  { label: 'שערי עץ', href: '/services/carpentry', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 15. HOME ORGANIZATION - סידור בית
  // ═══════════════════════════════════════════════════════════════════
  { label: 'סידור בית', href: '/services/home_organization', type: 'service' },
  { label: 'מארגנת בית', href: '/services/home_organization', type: 'service' },
  // סידור כללי
  { label: 'סידור בית מלא', href: '/services/home_organization', type: 'specialty' },
  { label: 'סידור חדרים', href: '/services/home_organization', type: 'specialty' },
  { label: 'סידור מטבח', href: '/services/home_organization', type: 'specialty' },
  { label: 'סידור חדר ילדים', href: '/services/home_organization', type: 'specialty' },
  { label: 'סידור חדר ארונות / ארונות בגדים', href: '/services/home_organization', type: 'specialty' },
  { label: 'סידור חדר אמבטיה', href: '/services/home_organization', type: 'specialty' },
  // סידור + מיון
  { label: 'מיון חפצים', href: '/services/home_organization', type: 'specialty' },
  { label: 'מיון בגדים', href: '/services/home_organization', type: 'specialty' },
  { label: 'מיון צעצועים', href: '/services/home_organization', type: 'specialty' },
  { label: 'הכנת חפצים למסירה / תרומה', href: '/services/home_organization', type: 'specialty' },
  // ארגון מקצועי
  { label: 'יצירת פתרונות אחסון', href: '/services/home_organization', type: 'specialty' },
  { label: 'אופטימיזציה של חללים קטנים', href: '/services/home_organization', type: 'specialty' },
  { label: 'עיצוב וסידור מדפים', href: '/services/home_organization', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 16. EVENT ENTERTAINMENT - הפעלות לאירועים
  // ═══════════════════════════════════════════════════════════════════
  { label: 'הפעלות לאירועים', href: '/services/event_entertainment', type: 'service' },
  { label: 'אירועים', href: '/services/event_entertainment', type: 'service' },
  // מכונות מזון
  { label: 'מכונת פופקורן', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת סוכר-בורי', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת ברד', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת וופל בלגי', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת גרניטה וקפה בר', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת גלידה אמריקאית', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת מילקשייק', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מסחטת מיצים טריים', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת נקניקיות', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מחבת קרפים', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מזרקת שוקולד', href: '/services/event_entertainment', type: 'specialty' },
  // מתנפחים ומשחקים
  { label: 'מתנפחים', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'ג\'ימבורי', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'עמדות משחק', href: '/services/event_entertainment', type: 'specialty' },
  // מכונות אפקטים
  { label: 'מכונת עשן', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת שלג', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מכונת בועות', href: '/services/event_entertainment', type: 'specialty' },
  // סוגי ההפעלה
  { label: 'קוסם ילדים', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'ליצן ילדים', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'בלוני צורות', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'הפרחת בלונים / ניפוח בלונים במקום', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'דמויות ותחפושות', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'שעשועונים ומשחקי קבוצה', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'מופע בועות סבון', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'הפעלה מוזיקלית / ריקודים', href: '/services/event_entertainment', type: 'specialty' },
  // אחר
  { label: 'איפור פנים מקצועי', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'בלוני קשת', href: '/services/event_entertainment', type: 'specialty' },
  { label: 'צילום מגנטים', href: '/services/event_entertainment', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 17. PRIVATE CHEF - שף פרטי
  // ═══════════════════════════════════════════════════════════════════
  { label: 'שף פרטי', href: '/services/private_chef', type: 'service' },
  { label: 'קייטרינג', href: '/services/private_chef', type: 'service' },
  // סוג המטבח
  { label: 'פיצות', href: '/services/private_chef', type: 'specialty' },
  { label: 'סושי', href: '/services/private_chef', type: 'specialty' },
  { label: 'סלטים', href: '/services/private_chef', type: 'specialty' },
  { label: 'אסייתי', href: '/services/private_chef', type: 'specialty' },
  { label: 'פסטות', href: '/services/private_chef', type: 'specialty' },
  { label: 'בשרי', href: '/services/private_chef', type: 'specialty' },
  { label: 'טבעוני / צמחוני', href: '/services/private_chef', type: 'specialty' },
  { label: 'לא גלוטן', href: '/services/private_chef', type: 'specialty' },
  { label: 'קינוחים', href: '/services/private_chef', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 18. PAINTING - צביעה
  // ═══════════════════════════════════════════════════════════════════
  { label: 'צביעה', href: '/services/painting', type: 'service' },
  { label: 'צבעי', href: '/services/painting', type: 'service' },
  { label: 'צביעה כללית של דירה', href: '/services/painting', type: 'specialty' },
  { label: 'תיקוני קירות – חורים, סדקים, שפכטל', href: '/services/painting', type: 'specialty' },
  { label: 'החלקת קירות (שפכטל מלא)', href: '/services/painting', type: 'specialty' },
  { label: 'תיקון רטיבות / עובש', href: '/services/painting', type: 'specialty' },
  { label: 'קילופי צבע ישן', href: '/services/painting', type: 'specialty' },
  { label: 'צביעת אפקטים – בטון, משי, אומבר', href: '/services/painting', type: 'specialty' },
  { label: 'צביעת קיר דקורטיבי / Accent Wall', href: '/services/painting', type: 'specialty' },
  { label: 'טקסטורות מיוחדות', href: '/services/painting', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 19. WATERPROOFING - איטום
  // ═══════════════════════════════════════════════════════════════════
  { label: 'איטום', href: '/services/waterproofing', type: 'service' },
  { label: 'איטומאי', href: '/services/waterproofing', type: 'service' },
  // איטום גגות
  { label: 'איטום גג ביריעות ביטומניות', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום גג בזפת חמה', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום גג עם פוליאוריטן', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום גג רעפים', href: '/services/waterproofing', type: 'specialty' },
  { label: 'תחזוקת גגות – ניקיון, תיקונים קלים', href: '/services/waterproofing', type: 'specialty' },
  // איטום קירות חיצוניים
  { label: 'איטום קירות מפני חדירת מים', href: '/services/waterproofing', type: 'specialty' },
  { label: 'שיקום קירות חוץ', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום סדקים בקירות', href: '/services/waterproofing', type: 'specialty' },
  { label: 'טיפול ברטיבות חיצונית', href: '/services/waterproofing', type: 'specialty' },
  // איטום מרפסות
  { label: 'איטום מרפסת לפני ריצוף', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום מרפסת קיימת (תיקון נזילות)', href: '/services/waterproofing', type: 'specialty' },
  { label: 'ריצוף + איטום מרפסת', href: '/services/waterproofing', type: 'specialty' },
  // איטום חדרים רטובים
  { label: 'איטום חדר אמבטיה', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום מקלחת', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום שירותים', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום לפני שיפוץ', href: '/services/waterproofing', type: 'specialty' },
  // איטום תת-קרקעי
  { label: 'איטום מרתפים', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום יסודות בניין', href: '/services/waterproofing', type: 'specialty' },
  { label: 'איטום קירות בחדרים תת-קרקעיים', href: '/services/waterproofing', type: 'specialty' },
  // בדיקות, אבחון וציוד
  { label: 'איתור נזילות', href: '/services/waterproofing', type: 'specialty' },
  { label: 'בדיקות רטיבות', href: '/services/waterproofing', type: 'specialty' },
  { label: 'צילום תרמי לאיתור נזילות', href: '/services/waterproofing', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 20. CONTRACTOR - קבלן שיפוצים
  // ═══════════════════════════════════════════════════════════════════
  { label: 'קבלן שיפוצים', href: '/services/contractor', type: 'service' },
  { label: 'קבלן', href: '/services/contractor', type: 'service' },
  { label: 'שיפוצים', href: '/services/contractor', type: 'service' },
  // עבודות שלד
  { label: 'בניית שלד', href: '/services/contractor', type: 'specialty' },
  { label: 'יציקות בטון', href: '/services/contractor', type: 'specialty' },
  { label: 'טפסנות', href: '/services/contractor', type: 'specialty' },
  { label: 'חיזוק מבנים', href: '/services/contractor', type: 'specialty' },
  { label: 'בניית קירות בלוקים', href: '/services/contractor', type: 'specialty' },
  { label: 'הריסה ובנייה מחדש', href: '/services/contractor', type: 'specialty' },
  // שיפוצים כלליים
  { label: 'שיפוץ דירה מלא', href: '/services/contractor', type: 'specialty' },
  { label: 'שיפוץ חדרים', href: '/services/contractor', type: 'specialty' },
  { label: 'שיפוץ חדרי רחצה', href: '/services/contractor', type: 'specialty' },
  { label: 'שיפוץ מטבח', href: '/services/contractor', type: 'specialty' },
  { label: 'החלפת ריצוף', href: '/services/contractor', type: 'specialty' },
  { label: 'עבודות גבס קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'טיח ושפכטל', href: '/services/contractor', type: 'specialty' },
  { label: 'סגירת מרפסת קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'צביעה מקצועית', href: '/services/contractor', type: 'specialty' },
  { label: 'החלפת דלתות ומשקופים', href: '/services/contractor', type: 'specialty' },
  // חשמל ואינסטלציה
  { label: 'עבודות חשמל קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'החלפת לוח חשמל קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'אינסטלציה כללית', href: '/services/contractor', type: 'specialty' },
  { label: 'החלפת צנרת קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'איתור ותיקון נזילות', href: '/services/contractor', type: 'specialty' },
  // עבודות חוץ
  { label: 'ריצוף חוץ', href: '/services/contractor', type: 'specialty' },
  { label: 'בניית פרגולה', href: '/services/contractor', type: 'specialty' },
  { label: 'חיפויי אבן / חיפויי קירות חוץ', href: '/services/contractor', type: 'specialty' },
  { label: 'גידור', href: '/services/contractor', type: 'specialty' },
  { label: 'בניית שבילים בגינה', href: '/services/contractor', type: 'specialty' },
  // שיקום ותיקון חוץ
  { label: 'תיקון טיח חוץ', href: '/services/contractor', type: 'specialty' },
  { label: 'שיקום קירות חיצוניים', href: '/services/contractor', type: 'specialty' },
  { label: 'איטום סדקים בקירות קבלן', href: '/services/contractor', type: 'specialty' },
  { label: 'טיפול בנפילת טיח', href: '/services/contractor', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 21. ALUMINUM - אלומיניום
  // ═══════════════════════════════════════════════════════════════════
  { label: 'אלומיניום', href: '/services/aluminum', type: 'service' },
  // חלונות ודלתות
  { label: 'התקנת חלונות אלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'דלתות אלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'דלתות הזזה (ויטרינות)', href: '/services/aluminum', type: 'specialty' },
  { label: 'דלתות כניסה מאלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'רשתות נגד יתושים', href: '/services/aluminum', type: 'specialty' },
  { label: 'תריסים ידניים', href: '/services/aluminum', type: 'specialty' },
  { label: 'תריסים חשמליים', href: '/services/aluminum', type: 'specialty' },
  // פרגולות ואלומיניום חוץ
  { label: 'פרגולות אלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'סגירת מרפסות אלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפויי אלומיניום חיצוניים', href: '/services/aluminum', type: 'specialty' },
  { label: 'מעקות אלומיניום לגינה / מרפסות', href: '/services/aluminum', type: 'specialty' },
  // תיקונים ושירות
  { label: 'תיקון מנועי תריס חשמלי', href: '/services/aluminum', type: 'specialty' },
  { label: 'תיקון מסילות', href: '/services/aluminum', type: 'specialty' },
  { label: 'תיקון גלגלים בחלונות', href: '/services/aluminum', type: 'specialty' },
  { label: 'החלפת ידיות / צירים', href: '/services/aluminum', type: 'specialty' },
  { label: 'איטום וחידוש מסביב לחלונות', href: '/services/aluminum', type: 'specialty' },
  { label: 'תיקון תריסים ידניים', href: '/services/aluminum', type: 'specialty' },
  // חיפויי אלומיניום
  { label: 'חיפוי צנרת / כיסוי צינורות', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפוי מונים (חשמל / מים / גז)', href: '/services/aluminum', type: 'specialty' },
  { label: 'ארגזים דקורטיביים מאלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפוי קווי מזגן', href: '/services/aluminum', type: 'specialty' },
  { label: 'הגנה למנוע מזגן חיצוני', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפוי קירות חוץ מאלומיניום', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפויים דקורטיביים', href: '/services/aluminum', type: 'specialty' },
  { label: 'חיפוי וארגזי תריס', href: '/services/aluminum', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 22. GLASS WORKS - עבודות זכוכית
  // ═══════════════════════════════════════════════════════════════════
  { label: 'עבודות זכוכית', href: '/services/glass_works', type: 'service' },
  { label: 'זגג', href: '/services/glass_works', type: 'service' },
  // זכוכיות לבית
  { label: 'זכוכית לחלונות', href: '/services/glass_works', type: 'specialty' },
  { label: 'זכוכית לבידוד רעש / בידוד חום', href: '/services/glass_works', type: 'specialty' },
  { label: 'זכוכית מחוסמת – זכוכית טריפלקס', href: '/services/glass_works', type: 'specialty' },
  { label: 'זכוכית חלבית / מט', href: '/services/glass_works', type: 'specialty' },
  // מקלחונים
  { label: 'מקלחון חזית', href: '/services/glass_works', type: 'specialty' },
  { label: 'מקלחון פינתי', href: '/services/glass_works', type: 'specialty' },
  { label: 'מקלחון פתיחה / הזזה', href: '/services/glass_works', type: 'specialty' },
  { label: 'התקנה / החלפה של זכוכית למקלחון', href: '/services/glass_works', type: 'specialty' },
  // מחיצות וקירות זכוכית
  { label: 'מחיצות זכוכית לבית', href: '/services/glass_works', type: 'specialty' },
  { label: 'קירות זכוכית ("Glass Wall")', href: '/services/glass_works', type: 'specialty' },
  { label: 'חדרי ישיבות מזכוכית', href: '/services/glass_works', type: 'specialty' },
  { label: 'דלתות זכוכית', href: '/services/glass_works', type: 'specialty' },
  // מעקות זכוכית
  { label: 'מעקה זכוכית למרפסת', href: '/services/glass_works', type: 'specialty' },
  { label: 'מעקה זכוכית למדרגות', href: '/services/glass_works', type: 'specialty' },
  { label: 'חיבורי נירוסטה / פרופילים', href: '/services/glass_works', type: 'specialty' },
  // ריהוט וזכוכית מעוצבת
  { label: 'שולחנות זכוכית לפי מידה', href: '/services/glass_works', type: 'specialty' },
  { label: 'מדפי זכוכית', href: '/services/glass_works', type: 'specialty' },
  { label: 'פלטות זכוכית לשולחן', href: '/services/glass_works', type: 'specialty' },
  { label: 'מראות מיוחדות בעיצוב אישי', href: '/services/glass_works', type: 'specialty' },
  // תיקונים ושירות
  { label: 'החלפת זכוכית שבורה', href: '/services/glass_works', type: 'specialty' },
  { label: 'החלפת חלון כפול', href: '/services/glass_works', type: 'specialty' },
  { label: 'תיקון דלתות זכוכית', href: '/services/glass_works', type: 'specialty' },
  { label: 'החלפת מחברים / צירים זכוכית', href: '/services/glass_works', type: 'specialty' },
  { label: 'אטימה סביב חלונות זכוכית', href: '/services/glass_works', type: 'specialty' },

  // ═══════════════════════════════════════════════════════════════════
  // 23. LOCKSMITH - מנעולן
  // ═══════════════════════════════════════════════════════════════════
  { label: 'מנעולן', href: '/services/locksmith', type: 'service' },
  // פריצות חירום
  { label: 'פריצת דלתות בית', href: '/services/locksmith', type: 'specialty' },
  { label: 'פריצת דלת פנים', href: '/services/locksmith', type: 'specialty' },
  { label: 'פריצת דלת נעולה ללא נזק', href: '/services/locksmith', type: 'specialty' },
  { label: 'פריצת דלת עם מפתח שבור', href: '/services/locksmith', type: 'specialty' },
  { label: 'פריצת רכב', href: '/services/locksmith', type: 'specialty' },
  { label: 'פריצת כספת', href: '/services/locksmith', type: 'specialty' },
  { label: 'פתיחת מחסן נעול', href: '/services/locksmith', type: 'specialty' },
  // החלפת מנעולים
  { label: 'החלפת צילינדר', href: '/services/locksmith', type: 'specialty' },
  { label: 'התקנת צילינדר נגד פריצה', href: '/services/locksmith', type: 'specialty' },
  { label: 'התקנת מנעולי רב־בריח', href: '/services/locksmith', type: 'specialty' },
  { label: 'התקנת מנעולי עליון', href: '/services/locksmith', type: 'specialty' },
  { label: 'התקנת מנעול חכם / דיגיטלי', href: '/services/locksmith', type: 'specialty' },
  // תיקון דלתות ובטיחות
  { label: 'תיקון דלת תקועה / לא נסגרת', href: '/services/locksmith', type: 'specialty' },
  { label: 'יישור דלת / כיוון דלת', href: '/services/locksmith', type: 'specialty' },
  { label: 'תיקון צירים / מנגנון', href: '/services/locksmith', type: 'specialty' },
  { label: 'שדרוג דלת רגילה לדלת ביטחון', href: '/services/locksmith', type: 'specialty' },
  { label: 'התקנת מנגנוני בטיחות', href: '/services/locksmith', type: 'specialty' },
  // מערכות מתקדמות
  { label: 'מנעולים חכמים', href: '/services/locksmith', type: 'specialty' },
  { label: 'קודן / מערכת כניסה ללא מפתח', href: '/services/locksmith', type: 'specialty' },
  { label: 'מערכות שליטה מרחוק (באפליקציה)', href: '/services/locksmith', type: 'specialty' },
];

export default searchableServices;