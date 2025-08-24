
import { ScrollText, Shield, Eye, Database, MessageCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Пользовательское соглашение - KoHiCo",
  description: "Пользовательское соглашение интернет-магазина KoHiCo. Права и обязанности сторон, условия использования сайта.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ScrollText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Пользовательское соглашение</h1>
          <p className="text-lg text-gray-600">
            Условия использования интернет-магазина KoHiCo
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Последнее обновление: 24 августа 2025 года
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
                владельцем интернет-магазина KoHiCo (далее — «Продавец») и физическими лицами, 
                использующими сайт и его сервисы (далее — «Покупатель»).
              </p>
              <p>
                Использование сайта www.kohico.ru означает безоговорочное принятие данного Соглашения 
                и указанных в нем условий. В случае несогласия с условиями Соглашения Покупатель должен 
                прекратить использование сайта.
              </p>
            </CardContent>
          </Card>

          {/* User Rights and Obligations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Права и обязанности Покупателя
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Покупатель имеет право:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Получать информацию о товарах, представленных на сайте</li>
                  <li>Оформлять заказы в соответствии с установленной процедурой</li>
                  <li>Требовать предоставления качественного товара</li>
                  <li>Возвращать товар в соответствии с законодательством РФ</li>
                  <li>Получать консультации по выбору товаров</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Покупатель обязуется:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Предоставлять достоверную информацию при регистрации и оформлении заказов</li>
                  <li>Своевременно оплачивать заказанные товары</li>
                  <li>Принимать товары в установленные сроки</li>
                  <li>Не использовать сайт для незаконной деятельности</li>
                  <li>Соблюдать права интеллектуальной собственности</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seller Rights and Obligations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                Права и обязанности Продавца
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Продавец имеет право:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Изменять ассортимент товаров, их цены и условия продажи</li>
                  <li>Приостанавливать работу сайта для технического обслуживания</li>
                  <li>Отказать в заключении договора купли-продажи при нарушении условий</li>
                  <li>Требовать оплату товара до его передачи Покупателю</li>
                  <li>Использовать информацию о Покупателе в соответствии с политикой конфиденциальности</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Продавец обязуется:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Предоставлять достоверную информацию о товарах</li>
                  <li>Передавать Покупателю товар надлежащего качества</li>
                  <li>Соблюдать сроки поставки товаров</li>
                  <li>Обеспечивать конфиденциальность персональных данных</li>
                  <li>Консультировать Покупателей по вопросам выбора товаров</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-orange-600" />
                Конфиденциальность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Продавец обязуется не разглашать полученную от Покупателя информацию. Не считается 
                нарушением предоставление информации агентам и третьим лицам, действующим на основании 
                договора с Продавцом, для исполнения обязательств перед Покупателем.
              </p>
              <p>
                Не считается нарушением обязательств разглашение информации в соответствии с 
                обоснованными и применимыми требованиями закона.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Мы собираем следующую информацию:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Имя, фамилия и контактные данные</li>
                  <li>Информация о заказах и предпочтениях</li>
                  <li>Техническая информация о посещениях сайта</li>
                  <li>Данные для обработки платежей</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-red-600" />
                Обработка персональных данных
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Регистрируясь на сайте и/или оформляя заказ, Покупатель дает согласие на обработку 
                персональных данных в соответствии с Федеральным законом «О персональных данных» 
                от 27.07.2006 № 152-ФЗ.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Цели обработки персональных данных:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Исполнение договора купли-продажи</li>
                  <li>Информирование о новых товарах и акциях</li>
                  <li>Улучшение качества обслуживания</li>
                  <li>Проведение маркетинговых исследований</li>
                </ul>
              </div>
              <p>
                Покупатель может отозвать согласие на обработку персональных данных, направив 
                письменное уведомление на адрес info@kohico.ru.
              </p>
            </CardContent>
          </Card>

          {/* Payment and Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Оплата и доставка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Цена товара указывается на сайте в рублях РФ и включает НДС. Оплата производится 
                способами, указанными на сайте в разделе «Доставка и оплата».
              </p>
              <p>
                Риск случайной гибели или повреждения товара переходит к Покупателю с момента 
                передачи ему товара. Доставка осуществляется способами, указанными на сайте.
              </p>
              <p>
                В случае невозможности связаться с Покупателем в течение 7 дней, заказ считается 
                аннулированным. При предоплаченном заказе средства возвращаются в течение 10 дней.
              </p>
            </CardContent>
          </Card>

          {/* Returns and Warranty */}
          <Card>
            <CardHeader>
              <CardTitle>Возврат и гарантии</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Возврат товара осуществляется в соответствии с законом РФ «О защите прав потребителей» 
                от 07.02.1992 № 2300-1 и настоящим Соглашением.
              </p>
              <p>
                Товар надлежащего качества может быть возвращен в течение 14 дней с момента покупки 
                при соблюдении условий, указанных в разделе «Возврат товара».
              </p>
              <p>
                Гарантийные обязательства по товару устанавливаются производителем и указываются 
                в сопроводительной документации к товару.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Ограничение ответственности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Продавец не несет ответственности за ущерб, причиненный Покупателю вследствие 
                неправильного использования товаров, приобретенных в интернет-магазине.
              </p>
              <p>
                Продавец не несет ответственности за содержание и работоспособность сайтов третьих лиц, 
                на которые могут вести ссылки с данного сайта.
              </p>
            </CardContent>
          </Card>

          {/* Final Provisions */}
          <Card>
            <CardHeader>
              <CardTitle>Заключительные положения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Продавец оставляет за собой право изменять данное Соглашение в одностороннем порядке. 
                При изменении условий в новой редакции указывается дата вступления изменений в силу.
              </p>
              <p>
                Все споры и разногласия решаются путем переговоров. При невозможности разрешения 
                споров путем переговоров они подлежат рассмотрению в суде по месту нахождения Продавца.
              </p>
              <p>
                Во всем остальном, что не предусмотрено настоящим Соглашением, стороны руководствуются 
                действующим законодательством Российской Федерации.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-4">Контактная информация</h3>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> info@kohico.ru
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Телефон:</strong> +7 (900) 000-00-00
              </p>
              <p className="text-sm text-gray-600">
                По вопросам, связанным с настоящим Соглашением, обращайтесь по указанным контактам
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
