"use client";

import { useState } from "react";
import { Phone, CheckCircle, Send, CalendarDays, Clock } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

const timeOptions = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00",
];

const packages = [
  "پکیج مشاوره ۱",
  "پکیج مشاوره ۲",
  "پکیج مشاوره ۳",
  "پکیج مشاوره ۴",
  "پکیج مشاوره ۵",
];

export default function Reservation() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    grade: "",
    field: "",
    city: "",
    package: "",
    description: "",
    consultationType: "تلفنی",
    date: "",
    time: "",
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }));
    setSuccess(false);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.grade || !form.field || !form.city) {
      alert("لطفاً اطلاعات ضروری را کامل کنید.");
      return;
    }
    if (!form.date) {
      alert("لطفاً تاریخ مشاوره را انتخاب کنید.");
      return;
    }
    if (!form.time) {
      alert("لطفاً ساعت مشاوره را انتخاب کنید.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          type: "reservation",
          ...form,
        }),
      });

      setSuccess(true);
      setForm({
        name: "", phone: "", grade: "", field: "", city: "", package: "",
        description: "", consultationType: "تلفنی", date: "", time: "",
      });
    } catch (error) {
      console.error(error);
      alert("ارسال درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" dir="rtl" className="site-section-light px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker inline-flex items-center gap-2">
            <CalendarDays size={17} />
            رزرو مشاوره
          </span>
          <h2 className="mt-5 text-3xl font-black text-[#0b1f3a] md:text-4xl">
            وقت مشاوره خود را رزرو کنید
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            اطلاعات خود را وارد کنید، سپس تاریخ و ساعت مناسب خود را انتخاب کنید تا درخواست شما برای بررسی و هماهنگی ثبت شود.
          </p>
        </div>

        <form
          onSubmit={submitForm}
          className="site-form mt-12 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl sm:p-8"
        >
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="text-xl font-black text-[#0b1f3a]">اطلاعات شما</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              موارد ستاره‌دار برای ثبت درخواست الزامی هستند.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="نام و نام خانوادگی *">
              <input name="name" value={form.name} onChange={updateField} placeholder="نام و نام خانوادگی" />
            </Field>

            <Field label="شماره تماس *">
              <input name="phone" value={form.phone} onChange={updateField} placeholder="09xxxxxxxxx" type="tel" dir="ltr" />
            </Field>

            <Field label="پایه *">
              <select name="grade" value={form.grade} onChange={updateField}>
                <option value="">انتخاب پایه</option>
                <option value="دهم">دهم</option>
                <option value="یازدهم">یازدهم</option>
                <option value="دوازدهم">دوازدهم</option>
                <option value="فارغ التحصیل">فارغ التحصیل</option>
              </select>
            </Field>

            <Field label="رشته تحصیلی *">
              <select name="field" value={form.field} onChange={updateField}>
                <option value="">انتخاب رشته</option>
                <option value="تجربی">تجربی</option>
                <option value="ریاضی">ریاضی</option>
                <option value="انسانی">انسانی</option>
                <option value="هنر">هنر</option>
                <option value="زبان">زبان</option>
              </select>
            </Field>

            <Field label="شهر *">
              <input name="city" value={form.city} onChange={updateField} placeholder="شهر خود را وارد کنید" />
            </Field>

            <Field label="بسته مشاوره">
              <select name="package" value={form.package} onChange={updateField}>
                <option value="">انتخاب بسته</option>
                {packages.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>

            <Field label="نوع مشاوره">
              <select name="consultationType" value={form.consultationType} onChange={updateField}>
                <option value="تلفنی">تلفنی</option>
                <option value="آنلاین">آنلاین</option>
                <option value="حضوری">حضوری</option>
              </select>
            </Field>

            <Field label="تاریخ مشاوره *" icon={<CalendarDays size={17} />}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={form.date}
                onChange={(date) => setForm((previous) => ({ ...previous, date: date ? date.format("YYYY/MM/DD") : "" }))}
                format="YYYY/MM/DD"
                calendarPosition="bottom-right"
                minDate={new Date()}
                inputClass="site-datepicker-input"
                placeholder="انتخاب تاریخ"
              />
            </Field>

            <Field label="ساعت مشاوره *" icon={<Clock size={17} />}>
              <select name="time" value={form.time} onChange={updateField}>
                <option value="">انتخاب ساعت</option>
                {timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <label className="mb-2 block font-bold text-[#0b1f3a]">توضیحات</label>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows={4}
              placeholder="اگر توضیح خاصی دارید اینجا بنویسید..."
            />
          </div>

          {(form.date || form.time) && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <div className="font-black">زمان انتخاب‌شده برای مشاوره:</div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm font-bold">
                {form.date && <span>📅 {form.date}</span>}
                {form.time && <span>🕐 {form.time}</span>}
              </div>
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
              <CheckCircle size={22} />
              <span className="font-bold">
                درخواست شما ثبت شد. پس از تأیید مشاور، زمان مشاوره از طریق پیام‌رسان بله به شما اطلاع داده می‌شود.
              </span>
            </div>
          )}

          <button type="submit" disabled={loading} className="site-primary-button mt-7 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-black shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60">
            <Send size={20} />
            {loading ? "در حال ثبت درخواست..." : "درخواست رزرو مشاوره"}
          </button>

          <a href="tel:+989380851505" className="site-outline-button mt-4 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-bold transition">
            <Phone size={20} />
            تماس مستقیم با مهیار: 09380851505
          </a>
        </form>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 font-bold text-[#0b1f3a]">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
