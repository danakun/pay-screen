import styles from "./App.module.css";
import { Footer } from "./components/layout/Footer";
import { LanguageSelector } from "./components/ui/LanguageSelector";
import { OrderSummary } from "./components/features/OrderSummary";
import { PaymentSection } from "./components/features/PaymentSection";
import Paycomet from "@assets/logos/Paycomet.svg";

function App() {
  return (
    <div className={styles.mainLayout}>
      {/* Header Left */}

      <div className={styles.headerLeft}>
        <div className={styles.container}>
          <img src={Paycomet} alt="Paycomet" className={styles.logo} />
        </div>
      </div>

      {/* Header Right */}
      <div className={styles.headerRight}>
        <div className={styles.container}>
          <LanguageSelector />
        </div>
      </div>

      {/* Content Left */}
      <div className={styles.contentLeft}>
        <div className={styles.container}>
          <OrderSummary
            amount="100.00"
            merchant="Bankstore"
            reference="#20220616123806"
          />
        </div>
      </div>

      {/* Content Right */}
      <div className={styles.contentRight}>
        <div className={styles.container}>
          <PaymentSection />
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footerLeft}>
        <div className={styles.container}>
          <Footer />
        </div>
      </div>

      {/* Empty footer right for desktop grid */}
      <div className={styles.footerRight}></div>
    </div>
  );
}

export default App;
// import styles from "./App.module.css";
// import { Footer } from "./components/layout/Footer";
// import { LanguageSelector } from "./components/ui/LanguageSelector";
// import { OrderSummary } from "./components/features/OrderSummary";
// import { PaymentSection } from "./components/features/PaymentSection";
// import Paycomet from "@assets/logos/Paycomet.svg";

// function App() {
//   return (
//     <>
//       <div className={styles.mainLayout}>
//         <header className={styles.header}>
//           <div className={`${styles.leftColumn} ${styles.leftHeaderP}`}>
//             <div
//               className={`${styles.container} ${styles.headerContainer} ${styles.left}`}
//             >
//               <img src={Paycomet} alt="Paycomet" className={styles.logo} />
//             </div>
//           </div>

//           <div className={`${styles.rightColumn} ${styles.rightHeaderP}`}>
//             <div className={`${styles.container} ${styles.headerContainer}`}>
//               <div className={styles.langInput}>
//                 <LanguageSelector />
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className={styles.leftColumn}>
//           <div className={`${styles.container} ${styles.left}`}>
//             <div className={styles.content}>
//               <OrderSummary
//                 amount="100.00"
//                 merchant="Bankstore"
//                 reference="#20220616123806"
//               />
//             </div>
//             <Footer className={styles.footer} />
//           </div>
//         </div>

//         <div className={styles.rightColumn}>
//           <div className={`${styles.container} ${styles.right}`}>
//             <div className={styles.content}>
//               <PaymentSection />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
