const clojure = `(comment
  "Once upon a time...")

(ns clj-dracula)

(defstruct dracula :location :birth-date :death-date :weaknesses)

(defn age
  [vamp] (- (vamp :death-date) (vamp :birth-date)))

;;...there was a guy named Vlad
(let [d (struct dracula "Transylvania" 1428 1476 '("Sunlight", "Garlic"))]
  (println (age d)))`

export default clojure;