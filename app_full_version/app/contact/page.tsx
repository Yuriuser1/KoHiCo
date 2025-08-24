
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusMessage } from "@/components/ui/status-message";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      toast.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            У вас есть вопросы о наших товарах или нужна консультация? 
            Мы всегда готовы помочь!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                  </div>
                  <p className="text-gray-600 mb-2">+7 (900) 000-00-00</p>
                  <p className="text-sm text-gray-500">Звонки принимаем ежедневно</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                  </div>
                  <p className="text-gray-600 mb-2">info@kohico.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Адрес</h3>
                  </div>
                  <p className="text-gray-600 mb-2">Москва, Россия</p>
                  <p className="text-sm text-gray-500">Доставка по всей стране</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Время работы</h3>
                  </div>
                  <div className="space-y-1 text-gray-600">
                    <p>Пн-Пт: 09:00 - 19:00</p>
                    <p>Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Мы в соцсетях
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Подписывайтесь на наши социальные сети для получения актуальной информации 
                  о новинках и акциях
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://instagram.com/kohico', '_blank')}
                  >
                    Instagram
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://t.me/kohico', '_blank')}
                  >
                    Telegram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <StatusMessage
                    type="success"
                    title="Сообщение отправлено!"
                    message="Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время."
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ваше имя"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Тема сообщения *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="О чем вы хотите нам написать?"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Опишите ваш вопрос или пожелание подробнее..."
                        disabled={isSubmitting}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="privacy" className="text-sm text-gray-600">
                        Я соглашаюсь с обработкой персональных данных и условиями использования сайта *
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Отправить сообщение
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-gray-600">Возможно, ответ на ваш вопрос уже есть здесь</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Как я могу быть уверен в подлинности товаров?</h3>
                <p className="text-gray-600 text-sm">
                  Мы работаем только с официальными поставщиками и предоставляем гарантию 
                  подлинности на все товары. Каждый продукт проходит проверку качества.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Какие способы доставки доступны?</h3>
                <p className="text-gray-600 text-sm">
                  Мы предлагаем курьерскую доставку по Москве и отправку почтой по всей России. 
                  Доставка бесплатна при заказе от 3000 рублей.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Можно ли вернуть товар?</h3>
                <p className="text-gray-600 text-sm">
                  Да, мы принимаем возврат товаров надлежащего качества в течение 14 дней 
                  с момента получения при сохранении оригинальной упаковки.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Предоставляете ли вы консультации по выбору средств?</h3>
                <p className="text-gray-600 text-sm">
                  Конечно! Наши эксперты готовы помочь вам подобрать идеальные средства 
                  ухода в соответствии с вашим типом кожи и потребностями.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
