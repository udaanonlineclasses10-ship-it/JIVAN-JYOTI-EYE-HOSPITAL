import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle, Sparkles, X, User } from 'lucide-react';
import { PatientReview } from '../types';
import { submitReview } from '../services/hospitalService';

interface ReviewsSectionProps {
  reviews: PatientReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  const [modalOpen, setModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [treatment, setTreatment] = useState('Phaco Cataract Surgery');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const averageRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((acc, curr) => acc + curr.rating, 0) / approvedReviews.length).toFixed(1)
    : '5.0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!patientName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!feedback.trim()) {
      setErrorMsg('Please write your review feedback.');
      return;
    }

    try {
      setSubmitting(true);
      await submitReview({
        patientName: patientName.trim(),
        rating,
        treatment: treatment.trim(),
        feedback: feedback.trim()
      });
      setSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setModalOpen(false);
        setPatientName('');
        setFeedback('');
      }, 2500);
    } catch (err) {
      setSubmitting(false);
      setErrorMsg('Failed to submit review. Please try again.');
    }
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Patient Testimonials & Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              What Our <span className="text-teal-600">Patients Say</span>
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Read verified patient experiences from cataract surgery, cornea clinic, and contact lens fits at Jivan Jyoti Eye Hospital Sheikhpura.
            </p>
          </div>

          {/* Average Score & Action */}
          <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
            <div className="text-center border-r border-slate-200 pr-6">
              <span className="text-3xl font-black text-slate-900 font-heading block">{averageRating}</span>
              <div className="flex items-center gap-0.5 justify-center text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">{approvedReviews.length} Verified Reviews</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Patient Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {rev.treatment}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                  {rev.patientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.patientName}</h4>
                  <span className="text-[10px] text-slate-400 block">Verified Patient · Sheikhpura</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              
              <div className="bg-teal-800 p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <h3 className="text-lg font-bold font-heading">Submit Patient Review</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg ? (
                  <div className="p-6 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">Review Submitted!</h4>
                    <p className="text-xs text-slate-600">
                      Thank you for your feedback. Your review has been sent to admin for moderation and will appear shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyanshu Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">Rating (1 to 5 Stars)</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                        >
                          <option value={5}>5 Stars - Outstanding</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Below Expectation</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">Treatment Received</label>
                        <select
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                        >
                          <option value="Phaco Cataract Surgery">Phaco Cataract Surgery</option>
                          <option value="Corneal Treatment">Corneal Treatment</option>
                          <option value="LASIK Consultation">LASIK Consultation</option>
                          <option value="Specialized Contact Lenses">Specialized Contact Lenses</option>
                          <option value="Glaucoma Evaluation">Glaucoma Evaluation</option>
                          <option value="General Eye OPD">General Eye OPD</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Your Review Feedback *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Describe your treatment experience, doctor consultation, and hospital facility..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm"
                      >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </>
                )}

              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
