Directory structure:
└── clementcyberknight-monk.base/
    ├── README.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── public/
    │   └── icons/
    └── src/
        └── app/
            ├── globals.css
            ├── layout.tsx
            ├── manifest.json
            ├── MobileCheck.tsx
            ├── not-found.tsx
            ├── page.tsx
            ├── account/
            │   ├── components/
            │   │   └── cardfeature.tsx
            │   ├── dashboard/
            │   │   ├── layout.tsx
            │   │   └── page.tsx
            │   ├── recieve-asset/
            │   │   ├── page.tsx
            │   │   └── components/
            │   │       ├── RecieveCrypto.tsx
            │   │       └── RecieveFiat.tsx
            │   └── send-asset/
            │       ├── page.tsx
            │       ├── components/
            │       │   ├── SendCrypto.tsx
            │       │   ├── SendFiat.tsx
            │       │   └── TransactionSuccessfull.tsx
            │       └── modal/
            │           └── PassCode.tsx
            ├── auth/
            │   ├── page.tsx
            │   └── components/
            │       ├── SetPinStep.tsx
            │       ├── SignupStep.tsx
            │       ├── UserDetailsStep.tsx
            │       └── VerifyPhoneStep.tsx
            └── fonts/
                ├── Actay-Regular.otf
                ├── Actay-RegularItalic.otf
                ├── ActayCondensed-Thin.otf
                ├── ActayCondensed-ThinItalic.otf
                ├── ActayWide-Bold.otf
                └── ActayWide-BoldItalic.otf
