import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [hoveredReel, setHoveredReel] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);        // small phones -> 1
      else if (w < 1024) setPerView(2);  // tablets / small desktops -> 2
      else setPerView(3);                // large screens -> 3
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      review: "Absolutely stunning jewelry! The craftsmanship is exceptional. Vinayak Jewellers exceeded my expectations. Highly recommended!",
      image: "data:image/jpeg;base64,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",
      verified: true,
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Mumbai",
      rating: 5,
      review: "Best gold jewelry store in the city. Authentic pieces with great customer service. Worth every penny!",
      image: "data:image/jpeg;base64,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",
      verified: true,
    },
    {
      id: 3,
      name: "Anjali Verma",
      location: "Bangalore",
      rating: 4,
      review: "Elegant designs and transparent pricing. The team is very helpful and knowledgeable. Perfect for my wedding!",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhIVFhUWFxUVFRUVFRUVFRUYFRUXGBUVFxUYHSggGBolGxUXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUrLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAEIQAAEDAQUECQIEBQMCBwEAAAEAAhEDBAUSITFBUWGBBiJxkaGxwdHwEzJSwtLhB0KisvEjYoIV4hYXkqOzw/IU/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQACAwACAgMBAQAAAAAAAAECEQMhMRJBBFEiMnETFP/aAAwDAQACEQMRAD8A0EJQE4BKAkRuFOATgEsIBoCUBLCcAgEATg1KAnAIIganhq4BPAQCAJwalAQ9vvCnRYXvMACSmPRMKjvfpdZbPIc/E78LIJ5kkAdkrBdI+m1avLac06f9Tu32WMe4kyT369yj578af89evU//ADOs8x9Gp/R6FV1u/ifBIpUZzyc4kRwIGvevPGQdRzUNSnnl4p7LUemXT/Eh5dFRjCOBLT35rdXTfdGuBgME/wAp15HQrwiw2ZhzeRxwjrcsxmtNdVlqUofSeXbSMpEfykT9w1/ws8s7i0nHMnsmFJhVH0Wv8WhuFx67cjO391oIWuOUym4wyxuN1UWFdhUsJsKko8KTCnkLoTJHC7CnwnNagGspyjaFBLQoosCEA2IQ1dykrVVCxsoCJ1HJV1oYr1zclT2oZlKnFdVYhKjOCPqBCVQpWD+mNwXKSFyQWQCUBKAlATBsJYToSwgGwnAJUoQRAE9oSAJ7QmHAJ4C4BMtFUNBM5DUoAa87wZRpuqPcAAvIeknSKpanxowHqsGna7eUV08v19apgaeo3JrQdTtc7isvT/yfZY5XbfDHTjUOcZnwCFLSTmFY0m4gWgbh3zPp3FGWa431IDYaNu0lL5zH1fwuXisstnnedwU9S6qhPVaY7FurmuJrAJGivad3s3BZ3mt8V/xk9eOVWvYYgt80bdF4FrgBUe0bczpt0PovSLy6NtqAgjsyXnV83K+z1MhlORWkzmXVRcLO42d2VcB+rRcH7XNyDhG3TMrf3FfArNHESDpPDgV5FcFpww8CZIBz0Jj1K1D6zqbBWZlDjiHPOBwMrHHK4ZNc8JnHpsJpCr+j95itTBkTtVo4Ltxss3HBlLLqoSEkKQhNhUkgCIoUklJiLptQD2NUVaonVaiEcZKCIBJRNNibSYpggzauip7UMyrmpoqi1DNKiAKgQlUI2og6oUtA0Lk4hckFlCWEqVMEXJVyA4JYXBOCZOATwEgCcEAlR0BZHpre4p0yHOgmIaPudOR7AAD4LTWuphBcToOXavE+ld6CvaHvGbR1WzuG3zKjK/S8J2rbRULjOkyexMou3d/ztURMjuUrIAzEk7DpMBR9Nt9rC7RkDvIA7j+62Ny08s1l7os7nFu4bOO8rZ3ZQgLlzu668ZrFa2dkKwosQtKmrGhqnjGWVFUqO9Z/pVdLarDlmASO1aumyQgbXQyM8VtlOmWOXbxawVTSxtjRwcO1p9pWopPNWzkOJHWkEbCZz8FQX3RwV3tjVwHfu5wjLhvAz9FwG7PaPwzsOUgrHLvtvOumk6NXh9IljjmIOkZH7XAjUL0azVsQz13715i+zYXtadWyabtpEEhp5jTetx0dtv1aYdoeoY3TqtuDLV05vyMd/wAl04JA1PK5oXW5E1IKRzkxpUbygGvdKfTppadNTAIIgCcAuATgEBHV0VNaHZq3rqrqM2pU4CqBCVUbVCDqqVwOuSlKkaxSpVyoEhKuSoDkoSJwQRwSkZLpTaj+qTwKCYj+IF5llEtDoLiWjeQPu7ANO0rybFLlp+nNv+raMIMtY0M55l3ifBZqmzPist/bok1NFc0CBOe1SUwXPAaJMyFA05g7tEdZGknq6jPjE/slldReM3V3dtvqNkU7M55xGdYEnRXdk6QOY6K1nezxVFQvx9PJgJO+JzVnYr5tVQS6j1QJMtJngIHHwKw+P3prcpvW2xsNva8At0KLrWsMBds1WVu68pqBsYZjIiNeC09tspbSxamJAWc3tVkgGj06bOFlCtUP+1gjvlWH/W6z2kuslVoI1yJ7lg7Rf9oY6abDAMEYTPkcuSubq6Y1sm1KbhOzA7PfDgMjthwHat5bpjljN9KnpSGl4qN/mzEiCCJieIKzVmqEOEamM+OYC2XThmJofESJ3dnNZG66Zx5ajPPTis8fK2v01Fa95Yx1UGGktcRsjaDzBlaboxaWuZ1Tm0mDpO0Zdnqsne1MNdTxCKb6bmzudvPf4JbsqvZTY6lkQ5wI2E/hI3QDzSnXZZY/KaeyUqmJoO8BLCrrjrYmt4tB8NFa4V34ZfKbedlNXRrVKxiYXgIc24TEqtpWAhKFDSzzUxyCCLCYShnW9oMTmigQRKNhFUVdaXZqe02sBQVM81NOAK5VfVqFWlQIKuwKbtXYL6q5ONFcl2O1uuXLlanLlyVBOCeEgTwEFXQgr6tYpUXvOxp/wjyF5/8AxDvOQKQOX3HPXPL1UZ5ai+PH5ZaefXnGTp6zpc7mcvBV7MiexS2l21c2nGZ0OLwGqynUdNm6FA2jYf8ACKoP/wBZpB3AqCy05MbwZ9EZdlmOPESABl2ncE87JKWEtsay67P14EGc8wtIbE4D74EaNaAqa4KfWnar287VDcI1Iz/2j3XH8nZlj3pV2Kyj6sky4TyzC3woBzG55wsXdTWNfIIkxPWBPaQthRt9Fjeu4CcgSY7uKvjv7Zcsv0qrT0eDnY2mD2Bw/ZG2S7HNEuIy3CELeVpdRrB7Z+k8CSdjtpjcclZ0bcHNVSxFxy1GG/iGThYBtmfRYmwtcDLhkcj2rcfxBdkyATLgMuwn0WQNZxYBGYOR34dBx1SxrXXTS0W1K9JrDhLXEPk6tB6ru5wHeuAhzWjIFxkcM9eOvcm9GXOxQCIIMA7HbW9hA8O1F2g4KzKmEw0mjUG4BzsD+cE/5UF9tn0ZxNYCc4LmnkScloKtYYQQZBEg9qo7qrgsAbqD65ImpU/0w0aAR3aLr4Mv46cHNP5Wq6870M4W6qWwWTR7jJQVSxOLpAV/YLKcOa1k3WCcXi1giVIy2B4yKAr3KHGSibFTbTyhX2FLabI76wdiPYtRQb1VR35aA0YxqEXd16tewOB1U9SgttsUnFuQAtg0lHW63twuM6BZi66mNxdslK3s12TIQlYqStXAEKvfVJKFbSSuUea5Gx8lwuXLlSnJVyUBBFCeAmhPCCMtFQNaSdACV4n0jtpq12mIbs4gZT2L1u9AKpdTLoY1mJ40LsU4ROwZGeS8rv8AYMNE5SGRyyg81jy3t0cMZqs3rRuyHaUfa6IFOR/KSw/8gIPZ93cobKwOqCd/kfncp7cCKeWmAYuLnHEPCFlb3I3k6tV1jbDu/wAirWzhocGbWYXdodrzGXwIOxU5icpBz5aqS1MIe0nQ9Ykc8uWY7UZXd0J/Gbbi72lrpG6ULbr3pzAe0naJ63MKK4LzbUDTOnVd5Kvt9h+nUFQAYmOOokHt3gg+K55j3rJ0277i1sb2kyWnkBPmtPdVppNIc5pMaFwGXeq64+kIluOxg5ziY5hk4Q3MOAjv3LVWW+gWtZTsYkE5F7Mg6ZPUDjy8VtjhPdsc8758Qd8X1Z8B+pUa0aS8gCdglB3VVxNlhluwo222QWl7frNaW08wwAYQ7DhxnWTGQE5AnVQ3ZZhSo4eLjynLwU8s7LC6mmL/AImWst+k1pzLiT2ARH9Sp7maKlJ50wwR2yBA71H0nvMWqpVwiRTcMBzzaMnZbTOfYp7GPoWTP7qrhkTBwgzMeCdmsJPsTLeVv0tLvqFh0g69mZB9eS1VqwvAf/tExt+0tPg5veswOswnaIg9hBjvyjir266uKkGO3HCduZOR8OawtbZRa9H60AZzGR7DmO5aFjZk7AR4rG2CphdnofE7PJbKxVGuIExMObuMBbcF705PyMftbUbINyMFMNCZSfklmV6DhV1qtwadFX2yo58YDG9Wd5WTKQM1QXZaC2rgcOxK0k9tud1VkOJ5KKz3Z9JgA2arX0wC1Vl7thpISsDK6kjYSrCz2No0VU2yunEDmrFtRwbxUQ4FtxAVX/8A1gIu10nO1UTbGEzc2uVyIFlC5LdG1yuSrlopwTkgTggU4JSQAuCAvtgLADvae2DMeCKUY7pXfs1HtpmGhuB7xpnnAO/LxWAttoLie4cAMgth0vs7QysW/wAtopmBuNMZLDvdJMcYXNlO3Zx6+PSWwGKgO7LvR15nGxjf9mfa2J8vBBXdS6w4nyznwRbqYhpOfXew8CWgHuKzy922xnSCgQWtjRoMdpOHyXWguNN4y6sHFtBcDLeeGeRXWTAKuCcjibPdmnXu0sAEagOneWtwk8dT3nenP7Ff6qe6ba6lUBGhycN4916DRqCq0HXKDxC8z0I4H1W1uS0loB1G0J/kY+VP42V7jT3dd+EdVxHDNXljsj/xHjCFumox7ZaQR5cleWaph1hZYtc86JpUA1qyXSu8CGOp09Tk4jYNyvL1vKRhYe0+yydvopZZJ48fuvNrC5zHOeMi0kDtM+it7M99ao01HFxbv8huXWix4KpMZEyeBbmD596IudgP1DMwJMTtMaLXPOWbicMLLqtDcRBfgcdSCO0Z+vgrC8DgcA3QYXTwacR7z5rPXfVirOcNBz2kt3dsK86RVJpsNIjXrE/hh2XeTyK5tdui0fd8PmNAB+r1V/dlpbk38M905jvWTsNrAbMjTQZGQP28VZXTVgh2skdx2J43V2yzx3K31nyDesSCJniUfSMZqiu2oQwEiWE5EHSSjK9thpz0y/yvSxy3HmZTVdb7xAOHaVE2yNycMzvQVlsBccZOZ8ETbbV9MQAqQsbPaxMSiLdGCTuWYumuS7EcyfBHXy97mEMMZIAWykOcSNiday0Ie6qeBuZz2oC97dhMnQbVHhp7Tmo4TLJag4TqnVXJqPDlyjFRKkS1SpFytRwTgmBPCZFLllulV4kOaOthEENb9z3T9vAQtO94Ak6LEdKqofUp1G/aHEToDlJ5ZBZ53pfHN1ir6vapVcWkBrcZcQN4EDPbAVE5+chE2l5k7i4xwzKDE6BZR0+LG7XnE0gxhd/cp3OwsDCDLXhzhtyIxd/ogKORy2a80Y3rF7nEgtEO47vLxCzynbXG9B30G/U6rtCYEHIDbOh2bkTbqrqlJjZEtyjQy7ceMd8qK73twueQTsaO8kFRWonGfwkYRuj+X08U/v8AxN1r/VbaqJa7C4EOyyIg9y0tzHYqWux5bTLyTP2znDRsBOydnBXVhZhAKfNei4J3V7d1KHLTWZghUtjEgFXNCpkuV0ZJntVXbWo59VD16coTLpmbaPuIHuVU2Wsab9Oq7Jzd4OvNaS02Q7Efc3REGatpBk/bT0gbzx8lrx4XLos+SYzbOWKmC5wB4g7zBESinvcGmm4ECBhORzzmNxjTsV5fFytDS2iAJAyAOoM+vgmXXYX1HtY5n2luKRsaQc0suOzLQnLLjtj7vqS4DcR3bo3LWsrBtP6gOYERvB3cVqr26M2eqQ40wHAQC3qnLs5qv/8ABgLeq/Mfbi0Bmdi0z4Mt9Mpz467FWS2uNNkZBxaSdjdsdsqyDCTJJOIzn4IT/odoFHA0NJlujsoBE67YVo2k6Qx2RAkZaxrI5rXjxynrm5LL4MbWgQ3VV95WJzgZOqurHY4zKrekFtDRhbmToFvXOrLGw0wA3PejX25pbCq7HaHOOHvKLdSGIQkaG22nA0nSVmL2c6oIbnGZ4rZXzd/1KccFQ2SgGiD2KcoaC6KeFs7EcXSgG1cBIGiKp1Qp39Fs9cmFy5RqhfrgkShdKyhOTQkqFBAr5bLRwMndzXlvSm8ajn4XE5YhAyaBMCB2L0O/rSGtIJMDMn2Xkt9W41qrnHIaAcBosc+634+gRfmkew4jHJMNZSWR2eI/CprWXYyzOIYAB2nedia0FgcCQcQgkGYOwTwhOsloIw6DCZHLZxlJeLmyGtEDOI27oWX3pr9bSXXWaKb2H+aSD+F0dX258EVYrudVwyBIPKN3YuNl6jcLQIcA46yTv7jC2fRyyhrc8ztVYT5XbPO/GaC3Z0eYWGnUbiGXaCNC07FLbOitQNil1xsGju45Faf6UGR81Cs7MQRnw9P3W+XHjl6wx5MsfGIuqyua0te0tI2OBHmicYG1bL6c5ZHt+cUx930zrTYf+I4R84rG/jfqtf8A0fuMcyuN/uiqFgrVNGFo/E/qjuOZWpp2ZjPtYwdgA47O1Tgb/kT7J4/j/ullz/qKm77kbTOInG/8REAdg2IuvQJ4/P3R7R8+dhUjWfO72W8xk6jC5W90DQu4akfM/cIoUGjQAfD7BTTHh6exUWLMcvT2KpOzcPds5f8A5Hehvq4n6wxuZO+P2BTbfW2A8PAfpKWz0urH4iByzd5OQa3oP6oOm2N3BPDWucHfzARPA7EJUqaBTUU0Ca1bKAqwXfiJe7MnTgrMAHPvSVngBGiZ2vZ8LwBvzT7RQMgqSg4OqyUbbnhSD9WLG3kC153FbOkAWrNdIWBsncll4FADJz1UNZzmnLRA1rWRUkaIllpBzWJ6FsrGEqVrWkLk9hrEqbKUFdCjwoqzsk4lA3hXgEg5wlRGT6YXyWjABLxt2NnYvOqr5crm+bxNR7wzNs5uPAQqJ7yDl3rD2uidRE+J0UlJpc4NGWk8sykxO0Bz3rrG0l+ZAmBJMeKKc9WQqNzhogGAePwyhM3VBuAjXx4oljJGACetp2EjLlHch2SHlpBzIAOhB3g/NFnGtvm2nuihifMaajt0HePkrbXPT+cisz0doPLiZBGETtzHHvK11hbHflyI9JWnFNRjy5bo4t6p+blJYnfOTvZKG5EfND7KOnk75+L91sxWL2+vm72Tmn5zHsomukdo8x/3Jxd6/m9wmR7R6fkCUfOY/wC5dPn5E/pXR6ebfYoI9u3n+b3Uzj6/mUFH28me6madPm79SCpKu3n+b3Q9d0eI/v8A2U7/AJzj3QVR+YngfFn6kHAlV2ee+f6gfJyMoP8AsA3E92BvogHnFlw/ID+QqxslLrknY2P/AHHew8EHRLae0/PnyUoqknh8+cklZ2/T5+6iYc/nzX+5NKyoHYoKrjBUtk1Udu6pPHPvQSnaSHiAn1KTnOU9ks2J0q4pWYSlokVmssNzWZ6UUCWuA3LX2qrhas7eAxDki+HHl1Gk7HBV5/06BIVu27GzMIh7IELH4HZazTaTlytnRK5HxGqv5SymSnAreGV7gFn73qh7XTOECTHuruq7Ik7l5z0jvt4x0KYjXG4n+kD1UZKwnbJsGbmgwAe8SoXuAGmeuvkES0QCOaArarL2t71DagMTs9V1BoMDmUrKhznQ5EJ1jbnEjX/B7EXwT0bULQeqCYgzsnU8phEWCwuqvBdv+7w5mYQVvqyBhkSSCDsIharo5YvqNAcSQIGWUxsntCiReVai4KIwAgRofD/KvLLSgx398eqgsNINEACBoBpA3cie5G0G59vpI8wF0Sajmt3U4+f0n1KiLcwfmUfpKmI/bnIHm1McJnjPji/UFSUtL28C39Kc3Zy/IPUpmw8/zn1CknPsPqf0oB7Tl82g/qTnHbxPm8+ijpbB2D/4wnHTl+U/qQSWn6+RH6VLTGnL8ihadefm/wBlOz53j2TIw7OX5FVWt+R7B5U/ZWztBy/KqW8TlHD8rUjhbupl2fb/APaFeClmTxMfPmiEumlAP/L+50f3qyeMiiFQFd/zuj071FS+fOz+1NrVJyjl6eY7kRZWbfHuz8jzKDWVlChvWkXYSOw+nqiaWnz5w5JTnkU0mWOgAFO6sAobVVwtXknSjppam1X06eFgaSJjETxzyCCbvpXfrKTILhLjACzts6S02sAxCTxXmtrtdWq7FUeXHeSoWNMglTva5NPQj0kYGzKAtHSUHRZmscoUCSl+b9XKghcjQewhyUOXLlUSGvCrhZJXlVteHVHPJ1Ljv2yFy5Zcla8atrumSNgGvj4IAjaVy5KLpamWm1S2dpBAyz1SLlN8Vj6W1TiBOWcgDSNi9I6H0f8ASB7u0n3SLlWHsTn5Wsoju+HyJRFPL5u/dniuXLZgInw9J/QFwGfPyI/QuXIIg0A7PyD1XOdlyP8Aa4/mXLkBI12fP8zv0p7Tl3Dwpj1SLkA8HLl6VCimHPmfMrlyZEPt5tVPbWTHLxFMeq5cinFvdn2g8Ae9rCiapls8Vy5CVSAMWfwR8/8ATxVhR8f3IjvkcxuSrkHRdN3z52jvXHVcuQSK2PyXhXTl+G11OMHvH7JFyVPH1Qi0qenXSLkljaTwdURToArlyIVHtu0EJFy5Ujdf/9k=",
      verified: true,
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Pune",
      rating: 5,
      review: "20+ years of trust is well deserved. Their purity certification and hallmark guarantee give me peace of mind.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDPrqBb1rBgPf8_gMZi-KFmNTEyDBjd3jcUQ&s",
      verified: true,
    },
    {
      id: 5,
      name: "Neha Gupta",
      location: "Jaipur",
      rating: 4,
      review: "Amazing collection of traditional and modern designs. The after-sales service is commendable!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdwuxfY9EFHfuMARfX0ocsIjcqELP1Ecv0A&s",
      verified: true,
    },
    {
      id: 6,
      name: "Arjun Mehta",
      location: "Ahmedabad",
      rating: 5,
      review: "Responsibly sourced materials and ethical practices. Love supporting a jewelry brand with values!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDE9QxqmuVgRmEsRKuz8XaEK05wrvoCmJcA&s",
      verified: true,
    },
  ];

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-[#FFF9E6] text-center">
      <BannerSlider />

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mb-3 mt-8 sm:mt-12">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"

          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

    {/* ---------- VINAYAK CATEGORIES ---------- */}
{/* ---------- VINAYAK COLLECTIONS ---------- */}
<section className="pt-3 sm:pt-6">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
    VINAYAK COLLECTIONS
  </h2>
  <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
    Discover Our Latest Jewellery Launches
  </p>

  <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-6 px-4">
    {/* CARD 1 - GIFT COLLECTION */}
    <Link 
      to="/alljewellery?category=Gifting" 
      state={{ scrollToTop: true }}
      className="relative w-full sm:w-[380px] lg:w-[550px] h-[200px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center group"
    >
      <img
        src="/images/zftj.png"
        alt="Vinayak Gift Range"
        className="max-w-full max-h-full object-contain sm:p-3 group-hover:scale-105 transition-transform duration-300"
      />
      
    </Link>

    {/* CARD 2 - WEDDING COLLECTION */}
    <Link 
      to="/alljewellery?category=Wedding%20Collection" 
      state={{ scrollToTop: true }}
      className="relative w-full sm:w-[380px] lg:w-[550px] h-[200px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center group mt-4 sm:mt-0"
    >
      <img
        src="/images/vinayak-6.jpg"
        alt="Vinayak Mangalsutra"
        className="max-w-full max-h-full object-contain sm:p-3 group-hover:scale-105 transition-transform duration-300"
      />
     
    </Link>
  </div>
</section>


      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-8 sm:mt-10">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

    

            {/* ---------- VINAYAK COLLECTIONS ---------- */}
<section className="pb-3 sm:pb-8 py-3 sm:pt-6">
  <div className="max-w-6xl mx-auto text-center px-4">
    {/* Section Heading */}
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[2px] cinzelfont">
      VINAYAK CATEGORIES
    </h2>
    <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
        Discover Your Perfect Fit - Shop By Category
    </p>

    {/* Collection Grid */}
    <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-8 ">
      {[
        { name: "Collections", category: "All Jewellery", img: "/images/homeCollection.png" },
        { name: "Gold", category: "Gold", img: "/images/homeCollection.png" },
        { name: "Diamond", category: "Diamond", img: "/images/homeCollection.png" },
        { name: "Silver", category: "Silver", img: "/images/homeCollection.png" },
        { name: "Men's", category: "Mens", img: "/images/homeCollection.png" },
        { name: "Coins", category: "Coins", img: "/images/homeCollection.png" },
        { name: "Gifting", category: "Gifting", img: "/images/homeCollection.png" },
        { name: "Birth Stones", category: "Birth Stones", img: "/images/homeCollection.png" },
      ].map((item, index) => (
        <Link
          key={index}
          to={`/alljewellery?category=${encodeURIComponent(item.category)}`}
           state={{ scrollToTop: true }}
          className="flex flex-col items-center text-center group no-underline"
        >
          {/* Image box */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Title below image */}
          <p className="mt-4 text-[#140100] text-[13px] tracking-[1px] uppercase mainfont font-normal">
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  </div>


            {/* View All Card (linked) */}
            {/* <Link
              to="/alljewellery"
              className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md h-64 border border-[#140100]/20 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl font-semibold text-[#140100]">10+</p>
              <p className="text-[#3B2E1E] text-[13px] mt-1 cinzelfont">
                Categories to Choose From
              </p>
              <button className="mt-3 text-[#3B2E1E] border border-[#E2C887] rounded-full px-6 py-1 text-[13px] hover:bg-[#E2C887]/20 transition">
                View All →
              </button>
            </Link> */}
         
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-8 sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- VINAYAK ASSURANCE ---------- */}
      <section className="pb-3 sm:pb-8 pt-4 sm:pt-6 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wide">
            VINAYAK ASSURANCE
          </h2>
          <p className="text-gray-700 mt-2">
            Designed With Precision, Treasured By You.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              {
                icon: "/images/assurance/Group 44.svg",
                title: "Master Craftsmanship",
                desc: "Every Piece Is Made With Expert Attention To Detail.",
              },
               {
                icon: "/images/assurance/Group 41.svg",
                title: "Purity Certified",
                desc: "Guaranteed Authenticity With Hallmark Standards.",
              },
              
              {
                icon: "/images/assurance/Group 42.svg",
                title: "Complete Transparency",
                desc: "100% Clarity In Quality And Value.",
              },
             {
                icon: "/images/assurance/Group 43.svg",
                title: "Responsibly Sourced",
                desc: "Ethically Obtained Materials You Can Trust.",
              },
              {
                icon: "/images/assurance/Group 40.svg",
                title: "Trust & Clarity",
                desc: "20+ Years Of Transparent Processes For Peace Of Mind.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center w-16 h-16 mx-auto bg-[#E2C887]/20 rounded-full text-3xl mb-4">
                 <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#3B2E1E]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-9 sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- SHOP BY OCCASION ---------- */}
      <section className="pb-3 sm:pb-8 pt-4 sm:pt-8 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[1.5px] cinzelfont">
            SHOP BY OCCASION
          </h2>
          <p className="text-[#1d1413] mt-2 mainfont tracking-wider text-[16px]">
            Celebrate Every Moment – Jewellery For Every Occasion
          </p>

          <div className="mt-6 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              { name: "Gold Wedding", img: "/images/homeCollection.png" },
              { name: "Gold Traditional", img: "/images/homeCollection.png" },
              { name: "Gold Rajasthani Collection", img: "/images/homeCollection.png" },
              { name: "Rose Gold Collection", img: "/images/homeCollection.png" },
              { name: "Diamond Wedding Collection", img: "/images/homeCollection.png" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Image box */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Title below image */}
                <p className="mt-4 text-[#140100] text-[13px] tracking-[1px] uppercase mainfont font-normal">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


       <div className="relative flex items-center justify-center mt-8 sm:mt-8">
       <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
       <img
         src="/images/logoContact.png"
         alt="Vinayak Logo Divider"
         className="mx-4 w-10 h-10 object-contain"
       />
       <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
     </div>

     <section className="pb-3 sm:pb-8 pt-6 sm:pt-8 bg-[#FFF9E6]">
       <div className="max-w-6xl mx-auto text-center px-4">
         <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
           FOLLOW US ON INSTAGRAM
         </h2>
         <p className="text-[#140100] mt-2 mainfont tracking-wider text-[15px]">
            Discover Our Latest Designs & Beautiful Moments
         </p>

         {/* Instagram Reels Grid - 4 blocks */}
         <div className="mt-10 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { id: 1, img: "/images/assurance/553290185_18058312511576450_6924904704858846143_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 2, img: "/images/assurance/554303973_18058113326576450_1916259205564255088_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 3, img: "/images/assurance/552767823_726665507048331_4922057443990608837_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 4, img: "/images/assurance/553346452_18057859808576450_6185915331741404152_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
           ].map((reel) => (
             <div
               key={reel.id}
               className="relative w-full h-[26rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
               onMouseEnter={() => setHoveredReel(reel.id)}
               onMouseLeave={() => setHoveredReel(null)}
             >
               {/* Video or Image */}
               {hoveredReel === reel.id ? (
                 <video
                   autoPlay
                   muted
                   loop
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 >
                   <source src={reel.video} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               ) : (
                 <img
                   src={reel.img}
                   alt={`Instagram Reel ${reel.id}`}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 />
               )}

                {/* Overlay */}
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 z-10" />


               {/* View on Instagram Button - Show on Hover */}
               <div className="absolute inset-0 flex items-end justify-center z-20 opacity-100  transition-opacity duration-300 pb-4">
                 <a
                   href="https://www.instagram.com/vinayak_jewellers_jaipur?igsh=Z2dzcWgyZThtY2o="
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[#0E0100] text-white text-[12px] px-4 py-2 rounded-full text-sm font-light shadow-lg hover:scale-105 transition-transform duration-200 flex items-center gap-1"
                 >
                  <img src="/public/images/Icon/video-play.svg" className="w-4 h-4"/>
                   {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                   </svg> */}
                   SEE REELS
                 </a>
               </div>
             </div>
           ))}
         </div>

   
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-10   sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- CUSTOMER EXPERIENCES & REVIEWS ---------- */}
      <section className="pb-3 sm:pb-16 pt-4 sm:pt-6 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
            CUSTOMER EXPERIENCES & REVIEWS
          </h2>
          <p className="text-[#140100] mt-2 mainfont tracking-wider text-[15px]">
           Explore what our customers say about Vinayak Jewellers - trust, quality, and service.
          </p>

          {/* Reviews Carousel/Slider */}
          <div className="mt-6 sm:mt-8 relative max-w-4xl mx-auto">
            {/* Responsive grid: perView controlled by JS */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
              {Array.from({ length: perView }).map((_, offset) => {
                const index = (reviewIndex + offset) % reviews.length;
                const review = reviews[index];
                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-[#E2C887]/30"
                  >
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#F4A116] text-[#F4A116]" />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-[#5A2B1A] mx-auto mb-3 opacity-30" />
                    <p className="text-[#140100] text-sm leading-relaxed mb-6 font-light">
                      "{review.review}"
                    </p>
                    <hr className="border-[#E2C887] mb-4" />

                    <div className="flex items-center gap-3">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#E2C887]"
                      />
                      <div className="text-left">
                        <h4 className="text-[#3B2E1E] font-semibold text-sm">
                          {review.name}
                        </h4>
                        <p className="text-[#140100]/60 text-xs">
                          {review.location} {review.verified && "✓"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next controls (small & mobile friendly) */}
            <button
              onClick={prevReview}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white p-2 rounded-full hover:scale-105 transition-transform duration-200 border border-[#b68d52] shadow-lg md:left-0 md:-translate-x-12"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white p-2 rounded-full hover:scale-105 transition-transform duration-200 border border-[#b68d52] shadow-lg md:right-0 md:translate-x-12"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === reviewIndex ? "bg-[#5A2B1A] w-8" : "bg-[#E2C887] w-2 hover:bg-[#5A2B1A]"}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Google Reviews Button */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://share.google/4UPSxxkfV0Cf8Av9l"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02]
                         text-white px-8 py-3 rounded-full font-semibold shadow-lg border border-[#b68d52]
                         hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Read on Google
            </a>

            <a
              href="https://www.instagram.com/vinayak_jewellers_jaipur?igsh=Z2dzcWgyZThtY2o="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-b from-[#E4405F] to-[#C13584]
                         text-white px-8 py-3 rounded-full font-semibold shadow-lg
                         hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
