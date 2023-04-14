import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AdminNav, AdminSidebar } from '../components';
import { useUserContext } from '../context/user_context';

const AdminPages = () => {
  const { page } = useParams();
  const { setClicked } = useUserContext();
  useEffect(() => setClicked(false), []);
  return (
    <Wrapper>
      <AdminNav />
      <main>
        <AdminSidebar page={page} />
        <section>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
          veritatis quos nihil dignissimos tempore maiores quibusdam. Vitae
          dolores sequi tempora quos voluptas unde. Culpa nihil laborum quas
          eius ipsum molestiae labore in, architecto recusandae commodi corporis
          nisi? Cumque, ducimus esse cupiditate earum ad eos, natus nihil velit
          ut quasi consequatur temporibus ipsam deserunt? Impedit suscipit
          expedita quo hic repellendus fuga beatae, eum cupiditate architecto
          corporis similique sed culpa ipsa totam repellat tempora optio in
          iusto veritatis necessitatibus quidem deserunt esse? Harum nulla
          exercitationem natus quos hic dolor ipsa, commodi, eaque odio dolorem
          cupiditate accusantium sapiente doloremque neque architecto
          voluptatum! Commodi harum rem ducimus? Distinctio doloribus non neque
          amet necessitatibus voluptatum eius deleniti cumque, eveniet nemo
          adipisci itaque officia modi officiis sequi, fuga ea consequuntur ipsa
          nesciunt sit molestias inventore? Quos aperiam sed id ea a? Excepturi,
          odio dolorum at deserunt quidem accusantium aliquid deleniti expedita
          sunt minus rem corporis quibusdam ea error similique nostrum ullam
          consectetur dicta dignissimos veniam magnam, omnis officia maiores.
          Similique excepturi eum officia eius culpa ut placeat recusandae,
          repellendus earum in voluptas error magni ex quam commodi eligendi
          nulla nemo. Ducimus, neque corporis? Accusamus illo consectetur modi
          nesciunt, eveniet quibusdam. Dolorum recusandae incidunt vitae
          doloremque consequuntur natus nam, nostrum sequi facere odit quis
          inventore ut voluptas. Odio deleniti optio provident excepturi eius
          corporis sunt facere magni dolor repudiandae quasi quae, saepe
          eligendi quibusdam est earum aperiam! Autem vitae, aliquam voluptas
          repellendus accusantium fugiat ratione quod quisquam veniam illum ut
          dicta mollitia possimus eveniet asperiores adipisci est aspernatur
          eius doloribus explicabo. Maiores tempore aspernatur iste totam
          laudantium, rem aut nulla minima amet sit libero fugiat autem quod.
          Dicta molestiae ipsum, quam, ad eaque omnis id iusto odit ab possimus
          tenetur deleniti distinctio, recusandae eum fugiat magnam libero?
          Voluptatum atque modi similique velit adipisci maxime molestias,
          suscipit laboriosam officia debitis at ipsa praesentium temporibus rem
          voluptas nisi, deleniti, magni aut esse mollitia? Illum ut voluptas
          sint, sequi officiis sapiente velit ullam vel facilis dolore nesciunt
          voluptatem soluta commodi ipsum totam nisi consequatur. Impedit enim
          soluta nobis architecto modi facilis molestias quibusdam voluptatibus!
          Totam blanditiis adipisci tenetur facere! Sed tempore consequatur at,
          commodi quos id iure adipisci ratione dicta explicabo architecto
          officiis, temporibus eveniet sint quasi sapiente quaerat? Quis
          molestiae, doloribus quaerat molestias, magnam labore sint animi sunt
          impedit dicta voluptatem minima officiis accusantium placeat? Ea
          facilis sequi blanditiis dolore dolores perspiciatis, earum enim
          provident maiores odio dignissimos iusto laboriosam excepturi minima
          delectus perferendis. Nam maiores hic nihil incidunt corporis porro
          quas, ipsam culpa placeat, obcaecati enim deserunt dicta magnam
          dolorum! Perferendis debitis inventore rerum consectetur reprehenderit
          aliquid vero ut ullam provident architecto quae dolorum consequuntur
          laudantium expedita, distinctio pariatur sunt praesentium facere
          incidunt, eaque consequatur magni neque nulla. Sed expedita odit
          obcaecati perferendis aliquid neque, minima explicabo porro voluptatem
          repellendus voluptate hic atque quod odio accusamus corrupti, quis
          quasi itaque, delectus error sapiente iure? Cumque delectus harum
          illum molestias at, eius impedit aspernatur mollitia voluptates maxime
          veritatis voluptatem inventore ipsam odit numquam obcaecati cupiditate
          alias temporibus deleniti quam, possimus sunt labore exercitationem.
          Voluptas eligendi, et impedit repudiandae neque nesciunt id amet ad
          voluptatibus atque sint, ab ipsum officiis iure. At quam id harum
          adipisci dolorum earum tenetur odio, officia molestiae placeat debitis
          iste dolores exercitationem aliquid odit incidunt facilis
          perspiciatis! Voluptatem totam iste aut culpa explicabo adipisci
          deleniti temporibus consequatur corrupti repellendus sunt hic officia
          nisi quam fuga, delectus, quibusdam eum ipsam voluptas eligendi.
          Expedita sed cumque accusamus eius quo iste placeat, est laudantium,
          ipsam nesciunt officia, iusto hic sint vitae totam minima maiores.
          Autem harum ducimus vero doloribus, quas nihil perspiciatis reiciendis
          in accusamus, laudantium culpa esse, iure non porro. Iure voluptates
          nesciunt qui, magnam omnis placeat necessitatibus cupiditate delectus
          ut nisi alias! Exercitationem, nobis ut! Enim saepe praesentium sunt
          modi accusantium officiis eius aperiam temporibus illo quibusdam, nam
          tenetur sequi voluptas et ex! Odit nostrum obcaecati adipisci
          doloremque cupiditate natus. Facilis, dicta! Deserunt fugiat libero
          corporis, culpa ad autem officiis quaerat, reiciendis voluptatem vero
          rerum. Atque reiciendis quaerat dignissimos ea eveniet tenetur sequi
          cupiditate vitae quisquam aut iste nesciunt quis nihil ex aperiam
          pariatur, accusamus animi! Natus aspernatur delectus excepturi cum,
          culpa accusamus expedita sit, eius magni consequatur consequuntur in
          voluptas beatae perferendis. Sit, maxime? Doloremque?
        </section>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  main {
    display: flex;
    section {
      font-size: 40px;
      height: calc(100vh - 2.8em);
      overflow-y: scroll;
      padding: 2em;
    }
  }
`;
export default AdminPages;
