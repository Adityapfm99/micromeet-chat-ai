import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import App from '../App';

afterEach(() => cleanup());

describe('Doctor-Patient Chat', () => {
  it('Doctor and Patient can send messages', () => {
    render(<App />);
    const doctorInput = screen.getByPlaceholderText('Type as Doctor...');
    const doctorSend = screen.getAllByText('Send')[0];
    const patientInput = screen.getByPlaceholderText('Type as Patient...');
    const patientSend = screen.getAllByText('Send')[1];

    fireEvent.change(doctorInput, { target: { value: 'Hello Patient' } });
    fireEvent.click(doctorSend);
    fireEvent.change(patientInput, { target: { value: 'Hello Doctor' } });
    fireEvent.click(patientSend);

    expect(screen.getByText('Hello Patient')).toBeInTheDocument();
    expect(screen.getByText('Hello Doctor')).toBeInTheDocument();
  });

  it('Typing indicator appears when typing', () => {
    render(<App />);
    const doctorInput = screen.getByPlaceholderText('Type as Doctor...');
    fireEvent.change(doctorInput, { target: { value: 'Typing...' } });
    expect(screen.getByText('Doctor is typing...')).toBeInTheDocument();
  });

  it('Generate Medical Record button is disabled when no messages', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    const recordBtn = buttons.find(btn => btn.textContent === 'Generate Medical Record');
    expect(recordBtn).toBeDisabled();
  });
});
