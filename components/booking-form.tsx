"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { EventType } from "@/components/event-details";

interface BookingFormData {
  name: string;
  email: string;
  date: Date | undefined;
  time: string;
  guests: number;
  specialRequests: string;
  eventId: string;
  ticketType: string;
  price: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
}

interface BookingFormProps {
  event: EventType;
}

export function BookingForm({ event }: BookingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    date: undefined,
    time: event.time,
    guests: 1,
    specialRequests: "",
    eventId: event.id.toString(),
    ticketType: event.price[0].category,
    price: parseFloat(event.price[0].price.replace('$', ''))
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (formData.guests > 20) {
      newErrors.guests = 'Maximum 20 guests allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date?.toISOString(),
          eventId: formData.eventId,
          ticketType: formData.ticketType,
          price: formData.price
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit booking');
      }

      const data = await response.json();
      toast.success('Booking successful!');
      setIsSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          date: undefined,
          time: '',
          guests: 1,
          specialRequests: '',
        });
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground">Thank you for your booking. We've sent a confirmation to your email.</p>
          <Button onClick={() => setIsSuccess(false)} className="mt-4">
            Make Another Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              disabled={isSubmitting}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              disabled={isSubmitting}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${errors.date ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => {
                    setFormData(prev => ({ ...prev, date: date || undefined }));
                    if (errors.date) {
                      setErrors(prev => ({ ...prev, date: undefined }));
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time *</Label>
            <select
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleInputChange}
              className={`flex h-10 w-full rounded-md border ${errors.time ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              disabled={isSubmitting}
            >
              <option value="">Select a time</option>
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 9; // 9 AM to 8 PM
                return [
                  { value: `${hour}:00`, label: `${hour}:00 AM` },
                  { value: `${hour}:30`, label: `${hour}:30` }
                ];
              }).flat().map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
            {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests *</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="20"
            required
            value={formData.guests}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={errors.guests ? 'border-red-500' : ''}
          />
          {errors.guests && <p className="text-sm text-red-500">{errors.guests}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special requirements or notes..."
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Book Now'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
